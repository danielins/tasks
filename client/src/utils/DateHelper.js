export const getFormattedDate = (timestamp) => {

	if (isNaN(parseInt(timestamp, 10))) { return ""; }

	let date = new Date(parseInt(timestamp, 10));

	return `${ formatDecimal(date.getDate()) }/${ formatDecimal(date.getMonth()+1) }/${ date.getFullYear() }`;

}


export const formatDecimal = (decimal) => {

	if ( decimal <= 9 ) {
		return `0${decimal}`;
	} else {
		return `${decimal}`;
	}

}