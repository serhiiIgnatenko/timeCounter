document.addEventListener("DOMContentLoaded", function (event) {
	let myDate = document.querySelector('.my-date');

	let ms = myDate.querySelector('.ms');
	let s = myDate.querySelector('.s');
	let m = myDate.querySelector('.m');
	let h = myDate.querySelector('.h');
	let week = myDate.querySelector('.week');
	let day = myDate.querySelector('.day');
	let months = myDate.querySelector('.months');
	let year = myDate.querySelector('.years');

	// let startDate = new Date(0);
	let startDate;

	if (localStorage.getItem('myDate')) {
		startDate = new Date(localStorage.getItem('myDate'));
		let startDay = formatNumber(startDate.getDate());
		let startMonth = formatNumber(startDate.getMonth() + 1);
		let startHours = startDate.getHours();
		let startMinuts = startDate.getMinutes();

		document.querySelector('#form-date').value = `${startDate.getFullYear()}-${startMonth}-${startDay}`;
		document.querySelector('#form-time').value = `${formatNumber(startHours)}:${formatNumber(startMinuts)}`;
	} else {
		startDate = new Date(0)
		let startDay = formatNumber(new Date().getDate());
		let startMonth = formatNumber(new Date().getMonth() + 1);
		document.querySelector('#form-date').value = `${new Date().getFullYear()}-${startMonth}-${startDay}`;
	};

	function formatNumber(num) {
		if (num < 9) {
			return `0${num}`
		} else {
			return num;
		}
	};


	function countTime() {
		let nowDate = new Date();
		let start = moment(startDate);
		let end = moment(nowDate);
		if (start > end) [start, end] = [end, start];
		let sValue = dateSettings(start, end, 'seconds');
		let mValue = dateSettings(start, end, 'minutes');
		let hValue = dateSettings(start, end, 'hours');
		let weekValue = dateSettings(start, end, 'week');
		let dayValue = dateSettings(start, end, 'days');
		let monthsValue = dateSettings(start, end, 'months');
		let yearValue = dateSettings(start, end, 'years');

		// ms.textContent = countDate;
		s.textContent = sValue;
		m.textContent = mValue;
		h.textContent = hValue;
		week.textContent = weekValue;
		day.textContent = dayValue;
		months.textContent = monthsValue;
		year.textContent = yearValue;

		setTimeout(countTime, 1000)
	};

	function dateSettings(start, end, setting = '') {
		return end.diff(start, setting);
	};

	countTime();

	let btn = document.querySelector('#calculate');
	btn.addEventListener('click', calculate);

	function calculate(e) {
		let form = this.closest('#time-form');
		let date = form.querySelector('#form-date').value;
		let time = form.querySelector('#form-time').value;
		startDate = new Date(Date.parse(`${date}T${time}`));
		localStorage.setItem('myDate', startDate);
	};

});
