import {yachtPagePropType} from '../../../../propTypes/yacht';
import EngineTypesImgsList from './EngineTypesImgsList';
import AsText from '../../../AsText';
import ResolvedHtmlField from '../../../ResolvedHtmlField';
import {useTextLabels} from '../../../../hooks/appData';
import PropulsionTechSlider from './TechSlider';
import {isRichEmpty} from '../../../../lib/utils';
import ResolvedLink from '../../../ResolvedLink';

export default function ElectricDrive({yacht}) {
	const {textLabels} = useTextLabels();

	return (
		<div className="propulsion__wrapper">
			<div className="container">
				<EngineTypesImgsList classAddons={{electric: 'detailed__svg_dark'}} />
				<div className="propulsion__title flex flex_sb_c flex_md_column flex_md_fs-fe">
					<div className="title-block title-block_left">
						<h3 className="h3">
							<AsText value={yacht.electric_title} />
						</h3>
						<div className="title-block__sub-title">
							<ResolvedHtmlField content={yacht.electric_description} />
						</div>
					</div>
					<div className="partnership flex flex_column flex_fs_fe flex_md_fs-fe">
						<div className="partnership__title">{textLabels.in_partnership_with}</div>
						<img src={require('../../../../assets/img/torgeedo-logo.png')}
								 alt="Torgeedo"
								 className="partnership__logo" />
					</div>
				</div>
				<PropulsionTechSlider slides={yacht.group_electric_technical_slides}
															thumbTabsClasses={'tabs__tabs_blue'}
				/>
				{!isRichEmpty(yacht.propulsion_customised_proposal) &&
				<div className="propulsion__footer">
					<div className="flex flex_fe_c hide_sm">
						<div className="text">
							<ResolvedHtmlField content={yacht.propulsion_customised_proposal} />
						</div>
						{textLabels.contact_us_label && textLabels.contact_us_link &&
						<ResolvedLink link={textLabels.contact_us_link}
													aAttrs={{className: 'btn btn_xs btn_border btn_width_auto'}}
						>
							{textLabels.contact_us_label}
						</ResolvedLink>
						}
					</div>
				</div>
				}
			</div>
		</div>
	);
}

ElectricDrive.propTypes = {
	yacht: yachtPagePropType().isRequired
};