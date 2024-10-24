// إنشاء زر "GET"
const getButton = document.createElement('button');
getButton.innerText = 'GET';
getButton.style.position = 'fixed';
getButton.style.top = '50%';
getButton.style.right = '20px';
getButton.style.zIndex = '1000';
getButton.style.padding = '10px 20px';
getButton.style.backgroundColor = '#4285F4';
getButton.style.color = '#ffffff';
getButton.style.border = 'none';
getButton.style.borderRadius = '5px';
getButton.style.cursor = 'pointer';

document.body.appendChild(getButton);

getButton.addEventListener('click', () => {
// وظيفة لاستخراج البريد الإلكتروني من النتائج
	function extractEmails() {
		let flights = [];

		// جمع بيانات الرحلات من panel-body الأولى
		$('.panel-body').first().find('.flight_table').each(function() {
			let depart = $(this).find('.flight-time').text();
			let amount = parseInt($(this).find('.priceInt').first().text());
			console.log(amount)
			flights.push({ depart: depart, amount: amount });
		});

		// جمع بيانات الرحلات من panel-body الثانية
		$('.panel-body').last().find('.flight_table').each(function() {
			let arrive = $(this).find('.flight-time').text();
			let amountReturn = parseInt($(this).find('.priceInt').first().text());

			// دمج بيانات الذهاب مع العودة
			flights.forEach(flight => {
				flight.totalAmount = flight.amount + amountReturn;
				flight.arrive = arrive; // إضافة وجهة العودة
			});
		});

		// ترتيب الرحلات حسب التكلفة الإجمالية
		flights.sort((a, b) => a.totalAmount - b.totalAmount);

		// اختيار أرخص 3 رحلات
		let cheapestFlights = flights.slice(0, 3);

		// عرض البيانات
		cheapestFlights.forEach(flight => {
			console.log(`Departure: ${flight.depart}, Arrival: ${flight.arrive}, Total Amount: ${flight.totalAmount}`);
		});

	}

// إضافة حدث النقر على الزر "GET"

    // استدعاء دالة استخراج البريد الإلكتروني
    const extractedEmails = extractEmails();

    // الحصول على البريد الإلكتروني المخزّن في التخزين المحلي
    chrome.storage.local.get('emails', function(result) {
        var storedEmails = result.emails || [];
        let uniqueList = [...new Set(extractedEmails)];
        storedEmails = storedEmails.concat(uniqueList);
        chrome.storage.local.set({ emails: storedEmails });
        
        // عرض البريد الإلكتروني المستخرج
        alert(`Extracted Emails: ${uniqueList.join(', ')}`);
    });
});

