// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require turbolinks
//= require tag-it
//= require twitter/typeahead.min
//= require best_in_place
//= require_tree .

loadScript = function(url, callback){
	var script = document.createElement("script");
	script.type = "text/javascript";
	if(callback){
		if (script.readyState){  //IE
			script.onreadystatechange = function(){
				if (script.readyState == "loaded" || script.readyState == "complete"){
					script.onreadystatechange = null;
					callback();
				}};
		} else {  //Others
			script.onload = function(){
				callback();
			};
	  }
	}
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

monthSelectorOnChange = function() {
	$('#monthSelector').on('change',function(){
		$('.calendar').children().addClass('hidden')
	  var month=$(this).val();
		$('.'+month+'').removeClass('hidden');
	});
}

dateSelectorInsertAndRemoval = function() {
	$('.addDate').bind('click', function() {
	  date=this.id
		$("#"+date).children().addClass("greyed-out");
	  $(".job-create-date").append("<input type='hidden' name='timeSlots[]' id='date' value="+date+" />");
	  if ($("#date[value='"+date+"']").length>1){
	  $("#"+date).children().removeClass("greyed-out");
			$("#date[value='"+date+"']").remove();
		}

	});
}

loadExistingMarkets = function(collection){
	$(".existing-locations").tagit({
    	onTagRemoved: function(event, ui){
    		destroyJobObject(ui[0].innerText);
    		console.log(ui[0])
    	}
    });
  $.each(collection, function(k, v){
  	$(".existing-locations").tagit("createTag", v);
  });
  $("input.ui-widget-content").attr('disabled', 'disabled');
}
initializeMarkets = function(){
	var area_market_data = [{area:'SF bay area'}, {area:'SF bay area - city of san francisco'}, {area:'SF bay area - east bay area'}, {area:'SF bay area - north bay / marin'}, {area:'SF bay area - peninsula'}, {area:'SF bay area - santa cruz co'}, {area:'SF bay area - south bay area'}, {area:'aberdeen'}, {area:'abilene, TX'}, {area:'acapulco'}, {area:'adelaide, SA'}, {area:'ahmedabad'}, {area:'akron / canton'}, {area:'albany, GA'}, {area:'albany, NY'}, {area:'albuquerque'}, {area:'alicante'}, {area:'altoona-johnstown'}, {area:'amarillo, TX'}, {area:'ames, IA'}, {area:'amsterdam / randstad'}, {area:'anchorage / mat-su'}, {area:'ann arbor, MI'}, {area:'annapolis, MD'}, {area:'appleton-oshkosh-FDL'}, {area:'asheville, NC'}, {area:'ashtabula, OH'}, {area:'athens, GA'}, {area:'athens, OH'}, {area:'atlanta, GA'}, {area:'atlanta, GA - city of atlanta'}, {area:'atlanta, GA - otp east'}, {area:'atlanta, GA - otp north'}, {area:'atlanta, GA - otp south'}, {area:'atlanta, GA - otp west'}, {area:'auburn, AL'}, {area:'auckland, NZ'}, {area:'augusta, GA'}, {area:'austin, TX'}, {area:'bacolod'}, {area:'baja california sur'}, {area:'bakersfield, CA'}, {area:'baleares'}, {area:'baltimore, MD'}, {area:'bangalore'}, {area:'bangladesh'}, {area:'barcelona'}, {area:'barrie, ON'}, {area:'basel'}, {area:'bath, UK'}, {area:'baton rouge'}, {area:'battle creek, MI'}, {area:'beaumont / port arthur'}, {area:'beijing'}, {area:'beirut, lebanon'}, {area:'belfast'}, {area:'belgium'}, {area:'belleville, ON'}, {area:'bellingham, WA'}, {area:'belo horizonte'}, {area:'bemidji, MN'}, {area:'bend, OR'}, {area:'berlin'}, {area:'bern'}, {area:'bhubaneswar'}, {area:'bicol region'}, {area:'bilbao'}, {area:'billings, MT'}, {area:'binghamton, NY'}, {area:'birmingham / west mids'}, {area:'birmingham, AL'}, {area:'bismarck, ND'}, {area:'bloomington, IN'}, {area:'bloomington-normal'}, {area:'boise, ID'}, {area:'bolivia'}, {area:'bologna'}, {area:'boone, NC'}, {area:'bordeaux'}, {area:'boston'}, {area:'boston - boston/cambridge/brookline'}, {area:'boston - metro west'}, {area:'boston - north shore'}, {area:'boston - northwest/merrimack'}, {area:'boston - south shore'}, {area:'boulder, CO'}, {area:'bowling green, KY'}, {area:'bozeman, MT'}, {area:'brainerd, MN'}, {area:'brantford-woodstock'}, {area:'brasilia'}, {area:'bremen'}, {area:'brighton'}, {area:'brisbane, QLD'}, {area:'bristol'}, {area:'brittany'}, {area:'brownsville, TX'}, {area:'brunswick, GA'}, {area:'budapest'}, {area:'buenos aires'}, {area:'buffalo, NY'}, {area:'bulgaria'}, {area:'butte, MT'}, {area:'cadiz'}, {area:'cagayan de oro'}, {area:'cairns, QLD'}, {area:'calgary, AB'}, {area:'cambridge, UK'}, {area:'canarias'}, {area:'canberra, ACT'}, {area:'cape cod / islands'}, {area:'cape town'}, {area:'cardiff / wales'}, {area:'caribbean islands'}, {area:'cariboo, BC'}, {area:'catskills'}, {area:'cebu'}, {area:'cedar rapids, IA'}, {area:'central NJ'}, {area:'central louisiana'}, {area:'central michigan'}, {area:'champaign urbana'}, {area:'chandigarh'}, {area:'charleston, SC'}, {area:'charleston, WV'}, {area:'charlotte, NC'}, {area:'charlottesville, VA'}, {area:'chatham-kent, ON'}, {area:'chattanooga, TN'}, {area:'chautauqua, NY'}, {area:'chengdu'}, {area:'chennai (madras)'}, {area:'chicago'}, {area:'chicago - city of chicago'}, {area:'chicago - north chicagoland'}, {area:'chicago - northwest indiana'}, {area:'chicago - northwest suburbs'}, {area:'chicago - south chicagoland'}, {area:'chicago - west chicagoland'}, {area:'chico, CA'}, {area:'chihuahua'}, {area:'chile'}, {area:'chillicothe, OH'}, {area:'chongqing'}, {area:'christchurch'}, {area:'cincinnati, OH'}, {area:'ciudad juarez'}, {area:'clarksville, TN'}, {area:'cleveland, OH'}, {area:'clovis / portales'}, {area:'college station, TX'}, {area:'cologne'}, {area:'colombia'}, {area:'colorado springs'}, {area:'columbia / jeff city'}, {area:'columbia, SC'}, {area:'columbus, GA'}, {area:'columbus, OH'}, {area:'comox valley, BC'}, {area:'cookeville, TN'}, {area:'copenhagen'}, {area:'cornwall, ON'}, {area:'corpus christi, TX'}, {area:'corvallis/albany'}, {area:'costa rica'}, {area:'coventry, UK'}, {area:'croatia'}, {area:'cumberland valley'}, {area:'curitiba'}, {area:'dalian'}, {area:'dallas / fort worth'}, {area:'dallas / fort worth - dallas'}, {area:'dallas / fort worth - fort worth'}, {area:'dallas / fort worth - mid cities'}, {area:'dallas / fort worth - north DFW'}, {area:'dallas / fort worth - south DFW'}, {area:'danville'}, {area:'darwin, NT'}, {area:'davao city'}, {area:'dayton / springfield'}, {area:'daytona beach'}, {area:'decatur, IL'}, {area:'deep east texas'}, {area:'del rio / eagle pass'}, {area:'delaware'}, {area:'delhi'}, {area:'denver, CO'}, {area:'derby, UK'}, {area:'des moines, IA'}, {area:'detroit metro'}, {area:'detroit metro - macomb county'}, {area:'detroit metro - oakland county'}, {area:'detroit metro - wayne county'}, {area:'devon & cornwall'}, {area:'dominican republic'}, {area:'dothan, AL'}, {area:'dresden'}, {area:'dublin, IE'}, {area:'dubuque'}, {area:'duluth / superior'}, {area:'dundee'}, {area:'dunedin, NZ'}, {area:'durban'}, {area:'dusseldorf'}, {area:'east anglia'}, {area:'east idaho'}, {area:'east midlands'}, {area:'east oregon'}, {area:'eastern CO'}, {area:'eastern CT'}, {area:'eastern NC'}, {area:'eastern kentucky'}, {area:'eastern montana'}, {area:'eastern panhandle'}, {area:'eastern shore'}, {area:'eau claire, WI'}, {area:'ecuador'}, {area:'edinburgh'}, {area:'edmonton, AB'}, {area:'egypt'}, {area:'el paso, TX'}, {area:'el salvador'}, {area:'elko, NV'}, {area:'elmira-corning'}, {area:'erie, PA'}, {area:'essen / ruhr'}, {area:'essex, UK'}, {area:'ethiopia'}, {area:'eugene, OR'}, {area:'evansville, IN'}, {area:'fairbanks, AK'}, {area:'fargo / moorhead'}, {area:'farmington, NM'}, {area:'faro / algarve'}, {area:'fayetteville, AR'}, {area:'fayetteville, NC'}, {area:'finger lakes, NY'}, {area:'finland'}, {area:'flagstaff / sedona'}, {area:'flint, MI'}, {area:'florence / muscle shoals'}, {area:'florence / tuscany'}, {area:'florence, SC'}, {area:'florida keys'}, {area:'fort collins / north CO'}, {area:'fort dodge, IA'}, {area:'fort smith, AR'}, {area:'fort wayne, IN'}, {area:'fortaleza'}, {area:'frankfurt'}, {area:'fraser valley, BC'}, {area:'frederick, MD'}, {area:'fredericksburg, VA'}, {area:'fresno / madera'}, {area:'ft mcmurray, AB'}, {area:'ft myers / SW florida'}, {area:'ft myers / SW florida - charlotte county'}, {area:'ft myers / SW florida - collier county'}, {area:'ft myers / SW florida - lee county'}, {area:'fukuoka'}, {area:'gadsden-anniston'}, {area:'gainesville, FL'}, {area:'galveston, TX'}, {area:'geneva'}, {area:'genoa'}, {area:'ghana'}, {area:'glasgow'}, {area:'glens falls, NY'}, {area:'goa'}, {area:'gold coast'}, {area:'gold country'}, {area:'granada'}, {area:'grand forks'}, {area:'grand island, NE'}, {area:'grand rapids, MI'}, {area:'great falls, MT'}, {area:'greece'}, {area:'green bay, WI'}, {area:'greensboro, NC'}, {area:'greenville / upstate'}, {area:'grenoble'}, {area:'guadalajara'}, {area:'guam-micronesia'}, {area:'guanajuato'}, {area:'guangzhou'}, {area:'guatemala'}, {area:'guelph, ON'}, {area:'gulfport / biloxi'}, {area:'haifa'}, {area:'halifax, NS'}, {area:'hamburg'}, {area:'hamilton-burlington'}, {area:'hampshire'}, {area:'hampton roads'}, {area:'hanford-corcoran'}, {area:'hangzhou'}, {area:'hannover'}, {area:'harrisburg, PA'}, {area:'harrisonburg, VA'}, {area:'hartford, CT'}, {area:'hattiesburg, MS'}, {area:'hawaii'}, {area:'hawaii - big island'}, {area:'hawaii - kauai'}, {area:'hawaii - maui'}, {area:'hawaii - molokai'}, {area:'hawaii - oahu'}, {area:'heartland florida'}, {area:'heidelberg'}, {area:'helena, MT'}, {area:'hermosillo'}, {area:'hickory / lenoir'}, {area:'high rockies'}, {area:'hilton head'}, {area:'hiroshima'}, {area:'holland, MI'}, {area:'hong kong'}, {area:'houma, LA'}, {area:'houston, TX'}, {area:'hudson valley, NY'}, {area:'humboldt county'}, {area:'huntington-ashland'}, {area:'huntsville / decatur'}, {area:'hyderabad'}, {area:'iloilo'}, {area:'imperial county'}, {area:'indianapolis'}, {area:'indonesia'}, {area:'indore'}, {area:'inland empire, CA'}, {area:'iowa city, IA'}, {area:'iran'}, {area:'iraq'}, {area:'ithaca, NY'}, {area:'jackson, MI'}, {area:'jackson, MS'}, {area:'jackson, TN'}, {area:'jacksonville, FL'}, {area:'jacksonville, NC'}, {area:'jaipur'}, {area:'janesville, WI'}, {area:'jersey shore'}, {area:'jerusalem'}, {area:'johannesburg'}, {area:'jonesboro, AR'}, {area:'joplin, MO'}, {area:'kaiserslautern'}, {area:'kalamazoo, MI'}, {area:'kalispell, MT'}, {area:'kamloops, BC'}, {area:'kansas city, MO'}, {area:'kelowna / okanagan'}, {area:'kenai peninsula'}, {area:'kennewick-pasco-richland'}, {area:'kenosha-racine'}, {area:'kent, UK'}, {area:'kenya'}, {area:'kerala'}, {area:'killeen / temple / ft hood'}, {area:'kingston, ON'}, {area:'kirksville, MO'}, {area:'kitchener-waterloo-cambridge'}, {area:'klamath falls, OR'}, {area:'knoxville, TN'}, {area:'kokomo, IN'}, {area:'kolkata (calcutta)'}, {area:'kootenays, BC'}, {area:'kuwait'}, {area:'la crosse, WI'}, {area:'la salle co'}, {area:'lafayette / west lafayette'}, {area:'lafayette, LA'}, {area:'lake charles, LA'}, {area:'lake of the ozarks'}, {area:'lakeland, FL'}, {area:'lancaster, PA'}, {area:'lansing, MI'}, {area:'laredo, TX'}, {area:'las cruces, NM'}, {area:'las vegas'}, {area:'lausanne'}, {area:'lawrence, KS'}, {area:'lawton, OK'}, {area:'leeds'}, {area:'lehigh valley'}, {area:'leipzig'}, {area:'lethbridge, AB'}, {area:'lewiston / clarkston'}, {area:'lexington, KY'}, {area:'lille'}, {area:'lima / findlay'}, {area:'lincoln, NE'}, {area:'lisbon'}, {area:'little rock'}, {area:'liverpool'}, {area:'logan, UT'}, {area:'loire valley'}, {area:'london, ON'}, {area:'london, UK'}, {area:'long island, NY'}, {area:'los angeles'}, {area:'los angeles - antelope valley'}, {area:'los angeles - central LA 213/323'}, {area:'los angeles - long beach / 562'}, {area:'los angeles - san fernando valley'}, {area:'los angeles - san gabriel valley'}, {area:'los angeles - westside-southbay-310'}, {area:'louisville, KY'}, {area:'lubbock, TX'}, {area:'lucknow'}, {area:'luxembourg'}, {area:'lynchburg, VA'}, {area:'lyon'}, {area:'macon / warner robins'}, {area:'madison, WI'}, {area:'madrid'}, {area:'maine'}, {area:'malaga'}, {area:'malaysia'}, {area:'manchester, UK'}, {area:'manhattan, KS'}, {area:'manila'}, {area:'mankato, MN'}, {area:'mansfield, OH'}, {area:'marseille'}, {area:'mason city, IA'}, {area:'mattoon-charleston'}, {area:'mazatlan'}, {area:'mcallen / edinburg'}, {area:'meadville, PA'}, {area:'medford-ashland'}, {area:'medicine hat, AB'}, {area:'melbourne, VIC'}, {area:'memphis, TN'}, {area:'mendocino county'}, {area:'merced, CA'}, {area:'meridian, MS'}, {area:'mexico city'}, {area:'milan'}, {area:'milwaukee, WI'}, {area:'minneapolis / st paul'}, {area:'minneapolis / st paul - anoka/chisago/isanti'}, {area:'minneapolis / st paul - carver/sherburne/wright'}, {area:'minneapolis / st paul - dakota / scott'}, {area:'minneapolis / st paul - hennepin county'}, {area:'minneapolis / st paul - ramsey county'}, {area:'minneapolis / st paul - washington co / WI'}, {area:'missoula, MT'}, {area:'mobile, AL'}, {area:'modesto, CA'}, {area:'mohave county'}, {area:'monroe, LA'}, {area:'monroe, MI'}, {area:'monterey bay'}, {area:'monterrey'}, {area:'montevideo'}, {area:'montgomery, AL'}, {area:'montpellier'}, {area:'montreal, QC'}, {area:'morgantown, WV'}, {area:'morocco'}, {area:'moscow'}, {area:'moses lake, WA'}, {area:'mumbai'}, {area:'muncie / anderson'}, {area:'munich'}, {area:'muskegon, MI'}, {area:'myrtle beach, SC'}, {area:'nagoya'}, {area:'nanaimo, BC'}, {area:'nanjing'}, {area:'napoli / campania'}, {area:'nashville, TN'}, {area:'new brunswick'}, {area:'new hampshire'}, {area:'new haven, CT'}, {area:'new orleans'}, {area:'new river valley'}, {area:'new york city'}, {area:'new york city - bronx'}, {area:'new york city - brooklyn'}, {area:'new york city - fairfield co, CT'}, {area:'new york city - long island'}, {area:'new york city - manhattan'}, {area:'new york city - new jersey'}, {area:'new york city - queens'}, {area:'new york city - staten island'}, {area:'new york city - westchester'}, {area:'newcastle / NE england'}, {area:'newcastle, NSW'}, {area:'niagara region'}, {area:'nicaragua'}, {area:'nice / cote d\'azur'}, {area:'normandy'}, {area:'north central FL'}, {area:'north dakota'}, {area:'north jersey'}, {area:'north mississippi'}, {area:'north platte, NE'}, {area:'northeast SD'}, {area:'northern WI'}, {area:'northern michigan'}, {area:'northern panhandle'}, {area:'northwest CT'}, {area:'northwest GA'}, {area:'northwest KS'}, {area:'northwest OK'}, {area:'norway'}, {area:'nottingham, UK'}, {area:'nuremberg'}, {area:'oaxaca'}, {area:'ocala, FL'}, {area:'odessa / midland'}, {area:'ogden-clearfield'}, {area:'okaloosa / walton'}, {area:'okinawa'}, {area:'oklahoma city'}, {area:'olympic peninsula'}, {area:'omaha / council bluffs'}, {area:'oneonta, NY'}, {area:'orange county, CA'}, {area:'oregon coast'}, {area:'orlando, FL'}, {area:'osaka-kobe-kyoto'}, {area:'ottawa-hull-gatineau'}, {area:'outer banks'}, {area:'owen sound, ON'}, {area:'owensboro, KY'}, {area:'oxford, UK'}, {area:'pakistan'}, {area:'palm springs, CA'}, {area:'pampanga'}, {area:'panama'}, {area:'panama city, FL'}, {area:'paris, FR'}, {area:'parkersburg-marietta'}, {area:'peace river country'}, {area:'pensacola, FL'}, {area:'peoria, IL'}, {area:'perth, WA'}, {area:'peru'}, {area:'perugia'}, {area:'peterborough, ON'}, {area:'philadelphia'}, {area:'phoenix, AZ'}, {area:'phoenix, AZ - central/south phx'}, {area:'phoenix, AZ - east valley'}, {area:'phoenix, AZ - phx north'}, {area:'phoenix, AZ - west valley'}, {area:'pierre / central SD'}, {area:'pittsburgh, PA'}, {area:'plattsburgh-adirondacks'}, {area:'poconos'}, {area:'poland'}, {area:'port huron, MI'}, {area:'portland, OR'}, {area:'portland, OR - clackamas county'}, {area:'portland, OR - clark/cowlitz WA'}, {area:'portland, OR - columbia gorge'}, {area:'portland, OR - multnomah county'}, {area:'portland, OR - north coast'}, {area:'portland, OR - washington county'}, {area:'portland, OR - yamhill co'}, {area:'porto'}, {area:'porto alegre'}, {area:'potsdam-canton-massena'}, {area:'prague'}, {area:'prescott, AZ'}, {area:'pretoria'}, {area:'prince edward island'}, {area:'prince george, BC'}, {area:'provo / orem'}, {area:'puebla, MX'}, {area:'pueblo, CO'}, {area:'puerto rico'}, {area:'puerto vallarta'}, {area:'pullman / moscow'}, {area:'pune'}, {area:'quad cities, IA/IL'}, {area:'quebec city'}, {area:'raleigh / durham / CH'}, {area:'rapid city / west SD'}, {area:'reading, PA'}, {area:'recife'}, {area:'red deer, AB'}, {area:'redding, CA'}, {area:'regina, SK'}, {area:'reno / tahoe'}, {area:'reykjavik'}, {area:'rhode island'}, {area:'richmond, IN'}, {area:'richmond, VA'}, {area:'rio de janeiro'}, {area:'roanoke, VA'}, {area:'rochester, MN'}, {area:'rochester, NY'}, {area:'rockford, IL'}, {area:'romania'}, {area:'rome'}, {area:'roseburg, OR'}, {area:'roswell / carlsbad'}, {area:'sacramento'}, {area:'saginaw-midland-baycity'}, {area:'saguenay, QC'}, {area:'salem, OR'}, {area:'salina, KS'}, {area:'salt lake city'}, {area:'salvador, bahia'}, {area:'san angelo, TX'}, {area:'san antonio'}, {area:'san diego'}, {area:'san diego - city of san diego'}, {area:'san diego - east san diego county'}, {area:'san diego - north san diego county'}, {area:'san diego - south san diego county'}, {area:'san luis obispo'}, {area:'san marcos, TX'}, {area:'sandusky, OH'}, {area:'santa barbara'}, {area:'santa fe / taos'}, {area:'santa maria, CA'}, {area:'sao paulo'}, {area:'sapporo'}, {area:'sarasota-bradenton'}, {area:'sardinia'}, {area:'sarnia, ON'}, {area:'saskatoon, SK'}, {area:'sault ste marie, ON'}, {area:'savannah / hinesville'}, {area:'scottsbluff / panhandle'}, {area:'scranton / wilkes-barre'}, {area:'seattle-tacoma'}, {area:'seattle-tacoma - eastside'}, {area:'seattle-tacoma - kitsap / west puget'}, {area:'seattle-tacoma - olympia / thurston'}, {area:'seattle-tacoma - seattle'}, {area:'seattle-tacoma - snohomish county'}, {area:'seattle-tacoma - south king co'}, {area:'seattle-tacoma - tacoma / pierce'}, {area:'sendai'}, {area:'seoul'}, {area:'sevilla'}, {area:'shanghai'}, {area:'sheboygan, WI'}, {area:'sheffield'}, {area:'shenyang'}, {area:'shenzhen'}, {area:'sherbrooke, QC'}, {area:'show low, AZ'}, {area:'shreveport, LA'}, {area:'sicilia'}, {area:'sierra vista, AZ'}, {area:'singapore'}, {area:'sioux city, IA'}, {area:'sioux falls / SE SD'}, {area:'siskiyou county'}, {area:'skagit / island / SJI'}, {area:'skeena-bulkley'}, {area:'south bend / michiana'}, {area:'south coast, MA'}, {area:'south dakota'}, {area:'south florida'}, {area:'south florida - broward county'}, {area:'south florida - miami / dade county'}, {area:'south florida - palm beach county'}, {area:'south jersey'}, {area:'southeast IA'}, {area:'southeast KS'}, {area:'southeast alaska'}, {area:'southeast missouri'}, {area:'southern WV'}, {area:'southern illinois'}, {area:'southern maryland'}, {area:'southwest KS'}, {area:'southwest MN'}, {area:'southwest MS'}, {area:'southwest TX'}, {area:'southwest VA'}, {area:'southwest michigan'}, {area:'space coast, FL'}, {area:'spokane / coeur d\'alene'}, {area:'springfield, IL'}, {area:'springfield, MO'}, {area:'st augustine, FL'}, {area:'st cloud, MN'}, {area:'st george, UT'}, {area:'st john\'s, NL'}, {area:'st joseph'}, {area:'st louis, MO'}, {area:'st petersburg, RU'}, {area:'state college, PA'}, {area:'statesboro, GA'}, {area:'stillwater, OK'}, {area:'stockton, CA'}, {area:'strasbourg'}, {area:'stuttgart'}, {area:'sudbury, ON'}, {area:'sunshine coast, BC'}, {area:'surat surat'}, {area:'susanville, CA'}, {area:'sweden'}, {area:'sydney, NSW'}, {area:'syracuse, NY'}, {area:'taiwan'}, {area:'tallahassee'}, {area:'tampa bay area'}, {area:'tampa bay area - hernando co'}, {area:'tampa bay area - hillsborough co'}, {area:'tampa bay area - pasco co'}, {area:'tampa bay area - pinellas co'}, {area:'tasmania'}, {area:'tel aviv'}, {area:'terre haute, IN'}, {area:'territories'}, {area:'texarkana'}, {area:'texoma'}, {area:'thailand'}, {area:'the thumb, MI'}, {area:'thunder bay, ON'}, {area:'tijuana, MX'}, {area:'tokyo'}, {area:'toledo, OH'}, {area:'topeka, KS'}, {area:'torino'}, {area:'toronto'}, {area:'toronto - brampton-caledon'}, {area:'toronto - city of toronto'}, {area:'toronto - durham region'}, {area:'toronto - mississauga'}, {area:'toronto - oakville-milton'}, {area:'toronto - york region'}, {area:'toulouse'}, {area:'treasure coast, FL'}, {area:'tri-cities, TN'}, {area:'trois-rivieres, QC'}, {area:'tucson, AZ'}, {area:'tulsa, OK'}, {area:'tunisia'}, {area:'turkey'}, {area:'tuscaloosa'}, {area:'tuscarawas co'}, {area:'twin falls, ID'}, {area:'twin tiers NY/PA'}, {area:'tyler / east TX'}, {area:'ukraine'}, {area:'united arab emirates'}, {area:'upper peninsula, MI'}, {area:'utica-rome-oneida'}, {area:'valdosta, GA'}, {area:'valencia'}, {area:'vancouver, BC'}, {area:'vancouver, BC - burnaby/newwest'}, {area:'vancouver, BC - city of vancouver'}, {area:'vancouver, BC - delta/surrey/langley'}, {area:'vancouver, BC - north shore'}, {area:'vancouver, BC - richmond'}, {area:'vancouver, BC - tricities/pitt/maple'}, {area:'venezuela'}, {area:'venice / veneto'}, {area:'ventura county'}, {area:'veracruz'}, {area:'vermont'}, {area:'victoria, BC'}, {area:'victoria, TX'}, {area:'vienna'}, {area:'vietnam'}, {area:'virgin islands'}, {area:'visalia-tulare'}, {area:'waco, TX'}, {area:'washington, DC'}, {area:'washington, DC - district of columbia'}, {area:'washington, DC - maryland'}, {area:'washington, DC - northern virginia'}, {area:'waterloo / cedar falls'}, {area:'watertown, NY'}, {area:'wausau, WI'}, {area:'wellington'}, {area:'wenatchee, WA'}, {area:'west bank'}, {area:'west virginia (old)'}, {area:'western IL'}, {area:'western KY'}, {area:'western maryland'}, {area:'western massachusetts'}, {area:'western slope'}, {area:'whistler / squamish'}, {area:'whitehorse, YT'}, {area:'wichita falls, TX'}, {area:'wichita, KS'}, {area:'williamsport, PA'}, {area:'wilmington, NC'}, {area:'winchester, VA'}, {area:'windsor, ON'}, {area:'winnipeg, MB'}, {area:'winston-salem, NC'}, {area:'wollongong, NSW'}, {area:'worcester / central MA'}, {area:'wuhan'}, {area:'wyoming'}, {area:'xi\'an'}, {area:'yakima, WA'}, {area:'yellowknife, NT'}, {area:'york, PA'}, {area:'youngstown, OH'}, {area:'yuba-sutter, CA'}, {area:'yucatan'}, {area:'yuma, AZ'}, {area:'zamboanga'}, {area:'zanesville / cambridge'}, {area:'zurich'}]	
	var markets = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('area'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  local: area_market_data
	});
	markets.initialize();
	return markets
}
typeAhead = function(initialized_markets){
	typeAhead = $('.typeahead').typeahead(null, {
		limit: 5,
	  displayKey: 'area',
	  source: initialized_markets.ttAdapter()
	});
	return typeAhead
}
marketSelectorRemoval = function() {
	$(document).on("click","span.lb-x", function () {
	   var locationToRemove = $(this).parent().parent().text().slice(0,-1);
	   $("#individualMarket[value='"+locationToRemove+"']").remove();
	})
}

marketSelectorInsert = function(){
	$('.new-job-locations').tagit();
	var initializedMarkets = initializeMarkets();
	markets=typeAhead(initializedMarkets);
	markets.bind("typeahead:selected", function(e, i, o){ 
	  var market = e.currentTarget.value;
	  $('.new-job-locations').tagit("createTag", market )
	  // createJobObject(market, code);
	  console.log(market);
	  $('.job-create-location').append("<input id='individualMarket' name='marketGroup[]' type='hidden' value='"+market+"' />");
		$('.typeahead').typeahead('val', '');
		$('input#market').val("");
	});

	$('.typeahead').on('blur', function(){
		$('input#market').val("");
	});
}
craigsListMarketSelectorUpdate = function(){
	var markets = initializeMarkets();
	market=typeAhead(markets);
	market.bind("typeahead:selected", function(e, i, o){ 
	  var market = e.currentTarget.value;
	  console.log(market);
	  $('.existing-locations').tagit("createTag", market + " (" + code + ")")
	  createJobObject(market, code);
		$('.typeahead').typeahead('val', '');
		$('input#market').val("");
	});

	$('.typeahead').on('blur', function(){
		$('input#market').val("");
	});
}

createJobObject = function(market, code){
	$.ajax({
	  url: window.location.pathname + '/create_job',
	  type: 'POST',
	  data: {
	  	"market": market,
	  	"craigslist_code": code
	  }
	});
}

destroyJobObject = function(tag){
	var withinParenthesis = /\(([^)]+)\)/;
	var beforeParenthesis = /([^\()]+)/;

	var craigslist_code = withinParenthesis.exec(tag);
	var market = beforeParenthesis.exec(tag);

	$.ajax({
	  url: window.location.pathname + '/destroy_job',
	  type: 'DELETE',
	  data: {
	  	"market": market[1],
	  	"craigslist_code": craigslist_code[1]
	  }
	});
}

jsPageFunctionHandler = function(){
}

$(document).ready(jsPageFunctionHandler);
// $(document).on('page:load', jsPageFunctionHandler);
$(document).on('turbolinks:load', function(){
	jsPageFunctionHandler
})




companyFilter = function(selection){
	window.location.href = window.location.origin + window.location.pathname + "?company="+ selection.value;
}


setQueueItem = function(item, job){
	console.log(item);
	var job_post_queue_item = $(item).attr('value');
  $.ajax({
    url: '/job_post_queue_items/'+job_post_queue_item,
    type: 'PATCH',
    data: {"job_post_queue_item": item.checked,
  					"job_id": job}
  });
}