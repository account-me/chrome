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
	var cheapestFlights;
	
	function extractEmails() {
		try{
			var flights = [];
			var list1 = [];
			var list2 = [];
		
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
		}catch(e){}
		
		var index1 = 1;
		var index2 = 2;
		
		list1.forEach(function(x1){
			
			index1++
			try{
				var de1 = x1.depart1.trim();
				var parts1x = de1.trim().split(" ");
				var city1x = parts1x[0];
				var timelist1x = de1.match(/\d+/g);
				var timeInNumber1x = parseInt(timelist1x.join(''));
				
				if(timeInNumber1x > 1900){return;}
				
				
				var ar1 = x1.arrive1.trim();
				var parts1xx = ar1.trim().split(" ");
				var city1xx = parts1xx[0];
				var timelist1xx = ar1.match(/\d+/g);
				var timeInNumber1xx = parseInt(timelist1xx.join(''));
				var am1 = x1.amount1;
			}catch(e){}
			
			list2.forEach(function(x2){
				
				index2++
				try{
					
					var de2 = x2.depart2.trim();
					var parts2x = de2.trim().split(" ");
					var city2x = parts2x[0];
					var timelist2x = de2.match(/\d+/g);
					var timeInNumber2x = parseInt(timelist2x.join(''));
					
					var ar2 = x2.arrive2.trim();
					var parts2xx = de2.trim().split(" ");
					var city2xx = parts2xx[0];
					var timelist2xx = ar2.match(/\d+/g);
					var timeInNumber2xx = parseInt(timelist2xx.join(''));
					
					var timeBtween = timeInNumber1xx - timeInNumber2x;
					var plus1 = timeBtween;
					
					
					var am2 = x2.amount2;
					
					var total = am1 + am2;
					var timeout1 = 0;
					
					if(timeBtween < 0){
						timeout1 = 1;
						plus1 = 9999;
					}
					
					if(timeBtween < 600){
						var xxx = {"depart1": de1, "arrive1": ar1, "amount1": am1,"depart2": de2, "arrive2": ar2, "amount2": am2, "total":total, "timeout": timeout1, "plus1":plus1};
						flights.push(xxx);
					}
					
				}catch(e){}
			});
		
		});
		

		flights.sort((a, b) => {
		// أولاً، نقارن بناءً على `total`
		if (a.total !== b.total) {
			return a.total - b.total;
		} 
		// إذا كانت `total` متساوية، نقارن بناءً على `plus1`
		return a.plus1 - b.plus1;
		});

		cheapestFlights = flights.slice(0, 5);
		
	

	}

// إضافة حدث النقر على الزر "GET"

    // استدعاء دالة استخراج البريد الإلكتروني
    const extractedEmails = extractEmails();

    // الحصول على البريد الإلكتروني المخزّن في التخزين المحلي
    chrome.storage.local.get('flights', function(result) {
        var storedFlights = result.flights || [];
        storedFlights = storedFlights.concat(cheapestFlights);
        chrome.storage.local.set({ flights: storedFlights });
		console.log(storedFlights);
        
        // عرض البريد الإلكتروني المستخرج
    });
});

