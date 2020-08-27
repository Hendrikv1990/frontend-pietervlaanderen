import PropTypes from 'prop-types';
import {jobPositionPropType} from '../../../propTypes/jobs';
import AsText from '../../AsText';
import ResolvedHtmlField from '../../ResolvedHtmlField';
import {useTextLabels} from '../../../hooks/appData';
import {useState} from 'react';
import ApplyDialog from './ApplyDialog';

export default function JobsList({positions}) {
	const {textLabels} = useTextLabels();

	const [modalOpen, setModalOpen] = useState(false);
	const handleModalClose = () => setModalOpen(false);

	const [applyTo, setApplyTo] = useState(null);
	const applyToClicked = (position, e) => {
		e.preventDefault();
		setApplyTo(position);
		setModalOpen(true);
	};

	return (
		<>
			<section className="section">
				<div className="container">
					<div className="flex flex_fs_s flex_wrap jobs-list">
						{positions.map((position, i) => (
							<div className="jobs-list__item"
									 key={i}
							>
								<div className="jobs-list__header">
									<h3 className="h3 jobs-list__title">
										<AsText value={position.title1} />
									</h3>
									<div className="jobs-list__subtitle">
										<AsText value={position.country} />
									</div>
								</div>
								<div className="jobs-list__body">
									<div className="jobs-list__text">
										<ResolvedHtmlField content={position.description} />
									</div>
								</div>
								<div className="jobs-list__footer">
									<a href="#"
										 className="btn btn_border_dark"
										 onClick={applyToClicked.bind(this, position)}
									>{textLabels.apply}</a>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<ApplyDialog open={modalOpen}
									 handleClose={handleModalClose}
									 position={applyTo}
			/>
		</>
	);
}

JobsList.propTypes = {
	positions: PropTypes.arrayOf(
		jobPositionPropType()
	)
};