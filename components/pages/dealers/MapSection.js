import {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {dealersPagePropType} from '../../../propTypes/dealers';
import clsx from 'clsx';
import AsText from '../../AsText';
import ResolvedHtmlField from '../../ResolvedHtmlField';
import DealersMap from './mapSection/Map';
import {useTextLabels} from '../../../hooks/appData';
import MapContactDialog from './mapSection/ContactDialog';

export default function DealersMapSection({dealersPage, dealersTree}) {
	const [modalOpen, setModalOpen] = useState(false);
	const [contactWithOffice, setContactWithOffice] = useState(null);
	const handleModalClose = () => setModalOpen(false);

	const $dealersMap = useRef(null);

	const onOfficeClicked = (office) => {
		if ($dealersMap.current) {
			$dealersMap.current.onOfficeClicked(office);
		}
	};

	const onContactClicked = (office) => {
		setContactWithOffice(office);
		setModalOpen(true);
	};

	return (
		<section className="section section_map">
			<div className="map-block">
				<div className="map-block__wrapper flex flex_fs_s flex_md_column-reverse">
					<div className="map-filters flex flex_fs_s flex_column">
						<div className="map-filters__menu">
							<CountriesMenu dealersTree={dealersTree}
														 onOfficeClicked={onOfficeClicked}
														 onContactClicked={onContactClicked}
							/>
						</div>
						<div className="map-filters__footer">
							<ResolvedHtmlField content={dealersPage.your_country_not_in_the_list} />
						</div>
					</div>
					<DealersMap dealersPage={dealersPage}
											ref={$dealersMap}
					/>
				</div>
			</div>
			<MapContactDialog open={modalOpen}
												handleClose={handleModalClose}
												office={contactWithOffice} />
		</section>
	);
}

DealersMapSection.propTypes = {
	dealersPage: dealersPagePropType().isRequired,
	dealersTree: PropTypes.array.isRequired
};

function CountriesMenu({dealersTree, onOfficeClicked, onContactClicked}) {
	const [openedContinents, setOpenedContinents] = useState([]);
	const [openedCountries, setOpenedCountries] = useState([]);

	const onContinentClicked = (continentIndex, e) => {
		e.preventDefault();
		toggleOpened(openedContinents, continentIndex);
		setOpenedContinents([].concat(openedContinents));
	};

	const onCountryClicked = (countryIndex, e) => {
		e.preventDefault();
		toggleOpened(openedCountries, countryIndex);
		setOpenedCountries([].concat(openedCountries));
	};

	return (
		<ul className="filter filter_level1 flex flex_fs_s flex_column">
			{dealersTree.map(({continentTitle, countries}, continentIndex) => (
				<li key={continentIndex}
						className={clsx('filter__item filter__item_level1', {'is-open': openedContinents.includes(continentIndex)})}
				>
					<a href="#"
						 className="filter__link"
						 onClick={onContinentClicked.bind(this, continentIndex)}
					>
						{continentTitle}
					</a>
					<ul className={clsx('filter filter_level2', {'is-show': openedContinents.includes(continentIndex)})}>
						{dealersTree[continentIndex].countries.map(({countryTitle, hasStates, states, offices}, countryIndex) => {
							const indexInOpenedArray = `${continentIndex}-${countryIndex}`;
							const isCountryOpened = openedCountries.includes(indexInOpenedArray);

							return (
								<li key={countryIndex}
										className={clsx('filter__item filter__item_level2', {'is-open': isCountryOpened})}
								>
									<a href="#"
										 className="filter__link"
										 onClick={onCountryClicked.bind(this, indexInOpenedArray)}
									>
										{countryTitle}
									</a>
									{hasStates
										? <States states={states}
															classNames={clsx({'is-show': isCountryOpened})}
															onOfficeClicked={onOfficeClicked}
															onContactClicked={onContactClicked}
										/>

										: <Offices offices={offices}
															 classNames={clsx({'is-show': isCountryOpened})}
															 onOfficeClicked={onOfficeClicked}
															 onContactClicked={onContactClicked}
										/>
									}
								</li>
							);
						})}

					</ul>
				</li>
			))}
		</ul>
	);
}

CountriesMenu.propTypes = {
	dealersTree: PropTypes.array.isRequired,
	onOfficeClicked: PropTypes.func.isRequired,
	onContactClicked: PropTypes.func.isRequired,
};

function States({states, classNames, onOfficeClicked, onContactClicked}) {
	const [openedStates, setOpenedStates] = useState([]);

	const onStateClicked = (countryIndex, e) => {
		e.preventDefault();
		toggleOpened(openedStates, countryIndex);
		setOpenedStates([].concat(openedStates));
	};

	return (
		<ul className={clsx('filter filter_level3', classNames)}>
			{states.map(({stateTitle, offices}, stateIndex) => (
				<li key={stateIndex}
						className={clsx('filter__item filter__item_level3', {'is-open': openedStates.includes(stateIndex)})}
				>
					<a href="#"
						 className="filter__link"
						 onClick={onStateClicked.bind(this, stateIndex)}
					>{stateTitle}</a>
					<Offices offices={offices}
									 onOfficeClicked={onOfficeClicked}
									 onContactClicked={onContactClicked}
									 classNames={clsx({'is-show': openedStates.includes(stateIndex)})}
					/>
				</li>
			))}
		</ul>
	);
}

States.propTypes = {
	states: PropTypes.array,
	classNames: PropTypes.string,
	onOfficeClicked: PropTypes.func.isRequired,
	onContactClicked: PropTypes.func.isRequired,
};
// is-show
function Offices({offices, classNames, onOfficeClicked, onContactClicked}) {
	const {textLabels} = useTextLabels();

	return (
		<ul className={clsx('filter filter_level4 flex flex_wrap flex_fs_s', classNames)}>
			{offices.map((office, i) => (
				<li key={i}
						className="filter__item filter__item_level4"
				>
					<div className="filter__link">
						<a href="#"
							 onClick={(e) => {e.preventDefault();onOfficeClicked(office);}}
						>
							<p><AsText value={office.title} /></p>
							<ResolvedHtmlField content={office.address} />
						</a>
						<a href={'#'}
							 onClick={(e) => {e.preventDefault();onContactClicked(office);}}
							 className={'contact'}
						>
							{textLabels.contact}
						</a>
					</div>
				</li>
			))}
		</ul>
	);
}

Offices.propTypes = {
	offices: PropTypes.array.isRequired,
	classNames: PropTypes.string,
	onOfficeClicked: PropTypes.func.isRequired,
	onContactClicked: PropTypes.func.isRequired,
};

function toggleOpened(openedList, index) {
	const position = openedList.findIndex((i) => i === index);
	if (position === -1) {
		openedList.push(index);
	} else {
		openedList.splice(position, 1);
	}
}