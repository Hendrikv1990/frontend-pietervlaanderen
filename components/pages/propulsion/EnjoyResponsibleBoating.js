import {useTextLabels} from '../../../hooks/appData';
import {useTranslation} from '../../Locale';
import NextLink from 'next/link';
import ResolvedHtmlField from '../../ResolvedHtmlField';
import _isEmpty from 'lodash/isEmpty';
import ResolvedLink from '../../ResolvedLink';

export default function EnjoyResponsibleBoating() {
	const {textLabels} = useTextLabels();
	const {locale} = useTranslation();

	return (
		<section className="text-block text-block_propulsion">
			<div className="container flex flex_sb_c flex_sm_column flex_sm_fs-s">
				<div className="text-block__content">
					<div className="logo">
						<NextLink href='/[lang]' as={`/${locale}`}>
							<a className="logo__link">
								<img className="logo__img"
										 src={require('../../../assets/img/logo.svg')}
										 alt="Green line yacht"
								/>
							</a>
						</NextLink>
					</div>
					<div className="title">
						<ResolvedHtmlField content={textLabels.enjoy_responsible_boating} />
					</div>
					{!_isEmpty(textLabels.get_in_touch_link) &&
						<ResolvedLink link={textLabels.get_in_touch_link}
													aAttrs={{className: 'btn btn_big'}}
						>
							{textLabels.get_in_touch_label}
						</ResolvedLink>
					}
				</div>
				<div className="text-block__content">
					<div className="detailed">
						<ul className="detailed__list flex flex_column flex_sm_row flex_sm_c-c">
							<li className="detailed__item">
								<img className="detailed__img"
										 src={require('../../../assets/img/diesel.svg')}
										 alt=""
								/>
							</li>
							<li className="detailed__item">
								<img className="detailed__img"
										 src={require('../../../assets/img/hybrid.svg')}
										 alt=""
								/>
							</li>
							<li className="detailed__item">
								<img className="detailed__img"
										 src={require('../../../assets/img/electric.svg')}
										 alt=""
								/>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}