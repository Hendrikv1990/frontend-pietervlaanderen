export default function CoverEngineTypesImgList() {
	return (
		<ul className="detailed__list">
			<li className="detailed__item">
				<img className="detailed__img" src={require('../../../assets/img/diesel.svg')} alt="" />
			</li>
			<li className="detailed__item">
				<img className="detailed__img" src={require('../../../assets/img/hybrid.svg')} alt="" />
			</li>
			<li className="detailed__item">
				<img className="detailed__img" src={require('../../../assets/img/electric.svg')} alt="" />
			</li>
		</ul>
	);
}