import {useState} from 'react';
import {connect} from 'react-redux';
import {useTextLabels} from '../../hooks/appData';
import clsx from 'clsx';
import {menuPropType} from '../../propTypes/menu';
import ResolvedLink from '../ResolvedLink';
import {RichText} from 'prismic-reactjs';

function ModelsMenu({mainMenu}) {
	const [isOpened, setIsOpened] = useState(false);
	const {textLabels} = useTextLabels();

	return (
		<div className={'models-menu flex flex_fs_c flex_column'}>
			<a href={'#'}
				 className={clsx('models-label', {open: isOpened})}
				 onClick={(e) => {e.preventDefault(); setIsOpened(!isOpened);}}
			>
				{textLabels.models_label}
			</a>
			<ul className={clsx('menu-list flex flex_fs_c flex_column', {open: isOpened})}>
				{mainMenu.menu_links.map((item, i) => (
					<li key={i} className="menu-list__item">
						<ResolvedLink link={item.link}
													aAttrs={{className: 'menu-list__link'}}
						>
							{RichText.asText(item.label)}
						</ResolvedLink>
					</li>
				))}
			</ul>
		</div>
	);
}

ModelsMenu.propTypes = {
	mainMenu: menuPropType().isRequired
};

const mapStateToProps = state => ({
	mainMenu: state.menu['main-menu']
});

export default connect(mapStateToProps)(ModelsMenu);