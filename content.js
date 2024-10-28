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
	function extractEmails() {
		var flights = [];
		var list1 = [];
		var list2 = [];

		// جمع بيانات الرحلات من panel-body الأولى
		$('.panel-body').first().find('.flight_table').each(function() {
			var depart1 = $(this).find('.flight-time').first().text();
			var arrive1 = $(this).find('.flight-time').last().text();
			var amount1 = parseInt($(this).find('.priceInt').first().text());
			var l1 = {"depart1": depart1, "arrive1": arrive1, "amount1": amount1};
			list1.push(l1);
			
			
		});
		
		$('.panel-body').last().find('.flight_table').each(function() {
			var depart2 = $(this).find('.flight-time').first().text();
			var arrive2 = $(this).find('.flight-time').last().text();
			var amount2 = parseInt($(this).find('.priceInt').first().text());
			var l2 = {"depart2": depart2, "arrive2": arrive2, "amount2": amount2};
			list2.push(l2);
			
		});
		
		list1.forEach(function(x1){
			var de1 = x1.depart1;
			var parts1x = de1.trim().split(" ");
			var city1x = parts1x[0];
			var time1x = parts1x[1];
			console.log(time1x);
			var timeInNumber1x = parseInt(time1x.replace(":", ""), 10);
			
			
			var ar1 = x1.arrive1;
			var parts1xx = ar1.trim().split(" ");
			var city1xx = parts1xx[0];
			var time1xx = parts1xx[1];
			var timeInNumber1xx = parseInt(time1xx.replace(":", ""), 10);
			var am1 = x1.amount1;
			
			list2.forEach(function(x2){
				var de2 = x2.depart2;
				var parts2x = de2.trim().split(" ");
				var city2x = parts2x[0];
				var time2x = parts2x[1];
				var timeInNumber2x = parseInt(time2x.replace(":", ""), 10);
				
				var ar2 = x2.arrive2;
				var parts2xx = de2.trim().split(" ");
				var city2xx = parts2xx[0];
				var time2xx = parts2xx[1];
				var timeInNumber2xx = parseInt(time2xx.replace(":", ""), 10);
				
				var am2 = x2.amount2;
				
				var total = am1 + am2;
				
				
				var xxx = {"depart1": de1, "arrive1": ar1, "amount1": am1,"depart2": de2, "arrive2": ar2, "amount2": am2, "total":total};
				flights.push(xxx);
			});
		
		});
		

		flights.sort((a, b) => a.total - b.total);

		var cheapestFlights = flights.slice(0, 3);
		
		console.log(cheapestFlights);
	

	}

// إضافة حدث النقر على الزر "GET"

    // استدعاء دالة استخراج البريد الإلكتروني
    const extractedEmails = extractEmails();

    // الحصول على البريد الإلكتروني المخزّن في التخزين المحلي
    chrome.storage.local.get('emails', function(result) {
        var storedEmails = result.emails || [];
        var uniqueList = [...new Set(extractedEmails)];
        storedEmails = storedEmails.concat(uniqueList);
        chrome.storage.local.set({ emails: storedEmails });
        
        // عرض البريد الإلكتروني المستخرج
    });
});

