import {useState} from 'react';
import PropTypes from 'prop-types';
import {contactTeamPropType} from '../../propTypes/contacts';
import AsText from '../AsText';
import isEmpty from 'lodash/isEmpty';
import {useTextLabels} from '../../hooks/appData';
import clsx from 'clsx';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import MainOfficeForm from '../pages/contacts/MainOfficeForm';


export default function TeamList({team, className}) {
	const {textLabels} = useTextLabels();
	const [recipient, setRecipient] = useState();
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	const onContactClicked = (teammate, e) => {
		e.preventDefault();

		setRecipient(teammate);
		setOpen(true);
	};

	return (
		<>
			<ul className={clsx('team-list', className)}>
				{team.map((item, i) => (
					<li key={i}>
						<div className={'img-wrapper'}>
							{item.photo?.small?.url &&
							<img src={item.photo.small.url} alt={item.name} />
							}
						</div>
						<div className={'info'}>
							<h6><AsText value={item.role} /></h6>
							<div className={'name'}>
								<h5><AsText value={item.name} /></h5>
								{!isEmpty(item.phone) &&
								<div className={'phone'}>
									<AsText value={item.phone} />
								</div>
								}
							</div>
							<a
								href={'#'}
								className={'contact'}
								onClick={onContactClicked.bind(this, item)}
							>
								{textLabels.contact}
							</a>
						</div>
					</li>
				))}
			</ul>
			<Dialog open={open}
							onClose={handleClose}
							aria-labelledby="form-dialog-title"
							className={'contact-with-teammate-dialog'}
			>
				<DialogTitle id="form-dialog-title" disableTypography>
					<Typography variant="h5" className={'header'}>
						<MailOutlineIcon className={'envelope-icon'} />
						{recipient && `${textLabels.send_message_to}: ${recipient.name}`}
					</Typography>
					<IconButton aria-label="close"
											onClick={handleClose}
											className={'close-icon'}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>
					{recipient && <MainOfficeForm to={recipient}
																				sendType={'messageTo'}
					/>}
				</DialogContent>
			</Dialog>
		</>
	);
}

TeamList.propTypes = {
	className: PropTypes.string,
	team: PropTypes.arrayOf(
		contactTeamPropType()
	),
};