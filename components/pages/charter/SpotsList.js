import PropTypes from 'prop-types';
import {charterSpotPropType} from '../../../propTypes/charterPage';
import _isEmpty from 'lodash/isEmpty';
import AsText from '../../AsText';
import {RichText} from 'prismic-reactjs';

export default function CharterSpotsList({spots}) {
	return (
		<section className="section">
			<div className="container">
				<div className="flex flex_fs_s flex_wrap charter-list">
					{spots.map((spot, i) => (
						<div key={i}
								 className="charter-list__item charter-card"
						>
							<div className="charter-card__header">
								<div className="flex flex_sb_c">
									<div className="charter-card__country">
										<img src={spot.country_flag.url}
												 alt={spot.country_flag.alt}
												 className="charter-card__flag"
										/>
									</div>
									<div className="charter-card__company-logo">
										<img src={spot.logo.url}
												 alt={spot.logo.alt}
												 className="charter-card__company-img"
										/>
									</div>
								</div>
							</div>
							<ul className="charter-card__list">
								{spot.group_yachts.map(({yacht_list, availability}, j) => (
									<li key={j}
											className="charter-card__list-item"
									>
										<div className="flex flex_sb_c">
											<div className="charter-card__name">{yacht_list}</div>
											<div className="charter-card__count">{availability}</div>
										</div>
									</li>
								))}
							</ul>
							<ul className="charter-card__contacts">
								{!_isEmpty(spot.adress) &&
								<li className="charter-card__contacts-item address">
									<AsText value={spot.adress} />
								</li>}
								{!_isEmpty(spot.phone_number) &&
								<li className="charter-card__contacts-item phone">
									<a href={preparePhoneLink(RichText.asText(spot.phone_number))}
										 className="link"
									>
										<AsText value={spot.phone_number} />
									</a>
								</li>}
								{!_isEmpty(spot.email) &&
								<li className="charter-card__contacts-item email">
									<a href={`mailto:${RichText.asText(spot.email)}`}
										 className="link"
									>
										<AsText value={spot.email} />
									</a>
								</li>}
								{!_isEmpty(spot.website) &&
								<li className="charter-card__contacts-item web">
									<a href={`http://${RichText.asText(spot.website)}`}
										 className="link"
										 target="_blank"
										 rel="noreferrer"
									>
										<AsText value={spot.website} />
									</a>
								</li>}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

CharterSpotsList.propTypes = {
	spots: PropTypes.arrayOf(
		charterSpotPropType()
	)
};

function preparePhoneLink(phone) {
	const tel = String(phone).replace(/\s/g, '');

	return `tel:${tel}`;
}