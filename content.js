$(document).ready(function() {
	
	setInterval(function() {
		$(".btn-refresh").find('.picon').click();
	}, 150000);
	
	
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
			
				$('#custom-panel-0').find('.flight_table').each(function() {
					var date1 = $("#custom-panel-0").find(".subtitle").text().trim();
					var depart1 = $(this).find('.flight-time').first().text();
					var arrive1 = $(this).find('.flight-time').last().text();
					var amount1 = parseInt($(this).find('.priceInt').first().text());
					var seatleft1 = $(this).find(".seatleft").text();
					if(seatleft1 != ""){
						seatleft1 = seatleft1.trim();
					}else{
						seatleft1 = "اكثر من 7 مقاعد";
					}
					
					var l1 = {"date1":date1, "depart1": depart1, "arrive1": arrive1, "amount1": amount1, "seatleft1":seatleft1};
					list1.push(l1);
					
					
				});
				
				$('#custom-panel-1').find('.flight_table').each(function() {
					var date2 = $('#custom-panel-1').find(".subtitle").text().trim();
					var depart2 = $(this).find('.flight-time').first().text();
					var arrive2 = $(this).find('.flight-time').last().text();
					var amount2 = parseInt($(this).find('.priceInt').first().text());
					var seatleft2 = $(this).find(".seatleft").text();
					if(seatleft2 != ""){
						seatleft2 = seatleft2.trim();
					}else{
						seatleft2 = "اكثر من 7 مقاعد";
					}
					var l2 = {"date2":date2,"depart2": depart2, "arrive2": arrive2, "amount2": amount2, "seatleft2":seatleft2};
					list2.push(l2);
					
				});
			}catch(e){}
			
			var index1 = 1;
			var index2 = 2;
			
			list1.forEach(function(x1){
				
				index1++
				try{
					
					var date11 = x1.date1;
					var de1 = x1.depart1.trim();
					var parts1x = de1.trim().split(" ");
					var city1x = parts1x[0];
					var timelist1x = de1.match(/\d+/g);
					var timeInNumber1x = parseInt(timelist1x.join(''));
					
					var seatleft11 = x1.seatleft1;
					
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
						var date22 = x2.date2;
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
						
						var seatleft22 = x2.seatleft2;
						
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
							var xxx = {"date1":date11,"depart1": de1, "arrive1": ar1, "amount1": am1,"date2":date22,"depart2": de2, "arrive2": ar2, "amount2": am2, "total":total, "timeout": timeout1, "plus1":plus1, "seatleft1":seatleft11, "seatleft2":seatleft22};
							flights.push(xxx);
						}
						
					}catch(e){}
				});
			
			});
			

			flights.sort((a, b) => {
			if (a.total !== b.total) {
				return a.total - b.total;
			} 
			return a.plus1 - b.plus1;
			});

			cheapestFlights = flights.slice(0, 3);
			
		

		}


		const extractedEmails = extractEmails();

		chrome.storage.local.get('flights', function(result) {
			var storedFlights = result.flights || [];
			storedFlights = storedFlights.concat(cheapestFlights);
			chrome.storage.local.set({ flights: storedFlights });
			console.log(storedFlights);
			
		});
	});
});

