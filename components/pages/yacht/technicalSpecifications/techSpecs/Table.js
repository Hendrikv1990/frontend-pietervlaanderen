import PropTypes from 'prop-types';

export default function TechSpecsTable({table, systemOfMeasurement}) {
	return (
		<div className="table">
			{table.map((row, i) => (
				<div key={i}
						 className="table__row flex flex_sb_c"
				>
					<div className="table__col table__col_left">{row.title}</div>
					<div className="table__col table__col_right">{row[`${systemOfMeasurement}_value`]}</div>
				</div>
			))}
		</div>
	);
}

TechSpecsTable.propTypes = {
	systemOfMeasurement: PropTypes.oneOf(['metric', 'imperial']),
	table: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			imperial_value: PropTypes.string,
			metric_value: PropTypes.string,
		})
	)
};