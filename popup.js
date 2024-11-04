



// Add an event listener to the button
$(document).ready(function() {
	$('#clear-emails-btn').on('click', function() {
	  chrome.storage.local.remove(['flights', 'outbound', 'inbound'], function() {
		$('#email-textarea').val(''); 
		alert('Flights cleared!');
	  });
	});
  });
  
  
  // Retrieve the combined emails from the database when the popup is opened
  $(document).ready(function() {
	  
	  
	  
	  
	  function parseArabicDate(arabicDate) {
		  var arabicMonths = {
			  "يناير": "January",
			  "فبراير": "February",
			  "مارس": "March",
			  "ابريل": "April",
			  "مايو": "May",
			  "يونيو": "June",
			  "يوليو": "July",
			  "اغسطس": "August",
			  "سبتمبر": "September",
			  "اكتوبر": "October",
			  "نوفمبر": "November",
			  "ديسمبر": "December"
			};
		  var parts = arabicDate.split(' ');
		  var day = parts[1];
		  var month = arabicMonths[parts[2]];
		  var year = parts[3];
		  return new Date(`${month} ${day}, ${year}`);
	  }
	  
	  
  
	  var airports = []; 
  
	  $.getJSON('airports.json', function(data) {
		  // يمكنك التعامل مع البيانات هنا
		  airports = data;
	  });
	  
  
	  $('#searchButton').click(function () {
		  // جلب قيمة الإدخال
		  const countryInput = $('#countryInput').val().trim();
  
		  var valueSearch = $("input[name='search1']:checked").val();
		  var foundAirports;
		  if(valueSearch === "country"){
			  console.log(valueSearch);
			  foundAirports = airports.filter(airport => 
				  airport.countryName.toLowerCase().includes(countryInput)
			  );
		  }else if (valueSearch === "city"){
			  console.log(valueSearch);
			  foundAirports = airports.filter(airport => 
				  airport.name.toLowerCase().includes(countryInput)
			  );
		  }else if (valueSearch === "airport"){
			  console.log(valueSearch);
			  foundAirports = airports.filter(airport => 
				  airport.shortName.toLowerCase().includes(countryInput)
			  );
		  }
  
  
		  // عرض النتيجة
		  if (foundAirports.length > 0) {
			  let resultText = '';
			  foundAirports.forEach(airport => {
				  // resultText += `اسم المطار هو ${airport.shortName} وكود المطار هو ${airport.code}<br>`;
				  resultText += '<div class="airport-box"><div class="airport-name1">'+ airport.name +'</div><div class="airport-name">'+ airport.shortName +'</div><div class="airport-code">'+ airport.code +'</div></div>'
			  });
			  $('#result').html(resultText); // عرض النتائج في div
		  } else {
			  $('#result').html('لم يتم العثور على مطارات , اكتب اسم الدولة بشكل صحيح'); // في حالة عدم وجود نتائج
		  }
	  });
  
  
	  $('ul.tabs li a').click(function(event){
		  console.log("Clicked");
		  event.preventDefault(); // منع السلوك الافتراضي للنقر على الروابط
  
		  // إزالة الفئة الفعالة من جميع التبويبات
		  $('ul.tabs li a').removeClass('active');
		  // إضافة الفئة الفعالة للتبويب الذي تم النقر عليه
		  $(this).addClass('active');
  
		  // إخفاء كل محتويات التبويبات
		  $('.tab-content').removeClass('active');
		  // إظهار المحتوى المرتبط بالتبويب الذي تم النقر عليه
		  var target = $(this).attr('href');
		  $(target).addClass('active');
	  });
  
  
  
	chrome.storage.local.get(['flights', 'outbound', 'inbound', 'amman'], function(result) {
	  var flInOut;
	  var flights = result.flights;
	  var outbound = result.outbound;
	  var inbound = result.inbound;
	  var amman = result.amman;
	  var startDate = "2024-12-01";
      var endDate = "2024-12-03";
	  console.log(flights);
	  var flight0 = flights.find(function (flight) {
		console.log(flight);
		return flight.dateNum > startDate && flight.dateNum < endDate;
	  });
	  console.log(flight0);
  
	  $("#sort-total").click(function(){
		  $(".pop-box").html("");
		  showData("total");
		});
  
		$("#sort-one").click(function(){
		  $(".pop-box").html("");
		  showData("one");
		});
  
		$("#sort-two").click(function(){
		  $(".pop-box").html("");
		  showData("two");
		});
  
		$("#sort-date").click(function(){
		  $(".pop-box").html("");
		  showData("date");
		});
	  
	  
	  
  
  
  
		showData("total");
	  
	  function showData(ty){
  
  
		  
		  if(ty == "date"){
			flInOut = flights;
			var sortedList = flInOut.sort(function(a, b) {
			  var dateA = parseArabicDate(a.date1);
			  var dateB = parseArabicDate(b.date1);
			  if (dateA - dateB === 0) {
				return a.total - b.total;
			  } else {
				  return dateA - dateB;
			  }
			});
		  }
		  if(ty == "total"){
			  flInOut = flights;
			var sortedList = flInOut.sort(function(a, b) {
			  var dateA = parseArabicDate(a.date1);
			  var dateB = parseArabicDate(b.date1);
			  if (a.total - b.total === 0) {
				return dateA - dateB;
			  } else {
				  return a.total - b.total;
			  }
			});
		  }
		  if(ty == "one"){
			  flInOut = outbound;
			var sortedList = flInOut.sort(function(a, b) {
			  var dateA = parseArabicDate(a.date1);
			  var dateB = parseArabicDate(b.date1);
			  if (a.amount1 - b.amount1 === 0) {
				return dateA - dateB;
			  } else {
				  return a.amount1 - b.amount1;
			  }
			});
		  }
		  if(ty == "two"){
			  flInOut = inbound;
			var sortedList = flInOut.sort(function(a, b) {
			  var dateA = parseArabicDate(a.date2);
			  var dateB = parseArabicDate(b.date2);
			  if (a.amount2 - b.amount2 === 0) {
				return dateA - dateB;
			  } else {
				  return a.amount2 - b.amount2;
			  }
			});
		  }
  		  
		  flInOut.forEach(function(ee){
			  
			  if(ee.site === "flynas" || ee.site1 === "flynas" || ee.site2 === "flynas"){
				  var vv1 = '<div class="tooltiptext1">'+ee.seatleft1+'</div>';
				  var vv2 = '<div class="tooltiptext2">'+ee.seatleft2+'</div>';
			  }else
			  {
				  var vv1 = '';
				  var vv2 = '';
			  }
			  var newProducts = '<div class="flight-box '+ ee.site +'">';
			  if(ee.timeout == 1){
				newProducts     += '<div class="clock-box"><img src="clock.png" alt="timeout"></div>';
			  }
				newProducts     += '<div class="row">';
				newProducts       += '<div class="col-4 seat1">' + ee.date1 + vv1 + '</div>';
				newProducts       += '<div class="col-2"><bdi>' + ee.depart1 + '</bdi></div>';
				newProducts       += '<div class="col-2"><bdi>' + ee.arrive1 + '</bdi></div>';
				newProducts       += '<div class="col-2"><bdi>' + ee.amount1 + ' <div class="rs1">RS</div></bdi></div>';
				newProducts       += '<div class="col-2 total-rs">اجمالي بالريال</div>';
				newProducts    += '</div>';
				newProducts     += '<div class="row">';
				newProducts       += '<div class="col-4 seat2">' + ee.date2 + vv2 +'</div>';
				newProducts       += '<div class="col-2"><bdi>' + ee.depart2 + '</bdi></div>';
				newProducts       += '<div class="col-2"><bdi>' + ee.arrive2 + '</bdi></div>';
				newProducts       += '<div class="col-2"><bdi>' + ee.amount2 + ' <div class="rs1">RS</div></bdi></div>';
				newProducts       += '<div class="col-2 total-num">'+ ee.total +'</div>';
				newProducts    += '</div>';
				newProducts += '</div>';
  
				var oneFlights = '<div class="flight-box '+ ee.site1 +'">';
				oneFlights     += '<div class="row">';
				oneFlights       += '<div class="col-5 seat1">' + ee.date1 + vv1 +'</div>';
				oneFlights       += '<div class="col-2"><bdi>' + ee.depart1 + '</bdi></div>';
				oneFlights       += '<div class="col-2"><bdi>' + ee.arrive1 + '</bdi></div>';
				oneFlights       += '<div class="col-3"><bdi style="font-size: 18px;">' + ee.amount1 + ' <div class="rs1">ريال</div></bdi></div>';
				oneFlights    += '</div>';
				oneFlights += '</div>';
  
				var twoFlights = '<div class="flight-box '+ ee.site2 +'">';
				twoFlights     += '<div class="row">';
				twoFlights       += '<div class="col-5 seat2">' + ee.date2 + vv2 +'</div>';
				twoFlights       += '<div class="col-2"><bdi>' + ee.depart2 + '</bdi></div>';
				twoFlights       += '<div class="col-2"><bdi>' + ee.arrive2 + '</bdi></div>';
				twoFlights       += '<div class="col-3"><bdi  style="font-size: 18px;">' + ee.amount2 + ' <div class="rs1">ريال</div></bdi></div>';
				twoFlights    += '</div>';
				twoFlights += '</div>';
  
				if(ty === "one"){
				  $('.pop-box').append(oneFlights);  
				}else if(ty === "two"){
				  $('.pop-box').append(twoFlights);  
				}else{
				  $('.pop-box').append(newProducts);  
				}
		  });
	  }
	});
  });
  
