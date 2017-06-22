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
//= require best_in_place
//= require jquery_ujs
//= require turbolinks
//= require tag-it
//= require twitter/typeahead.min
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

createLocationObject = function(tag){
	$.ajax({
	  url: window.location.pathname + '/create_location',
	  type: 'POST',
	  data: {
	  	"location": tag
	  }
	});
}

destroyLocationObject = function(tag){
	$.ajax({
	  url: window.location.pathname + '/destroy_location',
	  type: 'DELETE',
	  data: {
	  	"location": tag.slice(0,-1)
	  }
	});
}

proximityCityRequest = function(location, target, edit){
 var response = "";
 var xhr = new XMLHttpRequest();
 xhr.open('GET', 'https://xmlfeedme.herokuapp.com/api/proximity_cities.json?city_state='+location);
 xhr.onload = function() {
     if (xhr.status === 200) {
     	$.each(JSON.parse(xhr.responseText), function(index, value){
        $('.existing-'+target+'-locations').tagit('createTag', value);
        if(edit){
	  			createLocationObject(value);
        }
     	});
     }
     else {
         alert('Request failed.  Returned status of ' + xhr.status);
     }
 };
 xhr.send(); 
}
/////////////////////////////////////
loadSelectionPool = function(tagPool){
	$(".existing-"+tagPool.id+"-locations").tagit({
    	onTagRemoved: function(event, ui){
    	}
    });
  $("input.ui-widget-content").attr('disabled', 'disabled');
}

locationSelector = function(tagPool){
	var locations = new AddressPicker({
		autocompleteService: {
			// types: ["(cities)"],
			types: ["geocode"],
			componentRestrictions: { country: 'US' }
		}
	});
	locations.initialize();
	$('.typeahead#'+tagPool.id).typeahead(null, {
		limit: 1,
		displayKey: 'description',
	  source: locations.ttAdapter()
	}).bind("typeahead:selected", function(e, i, o){ 
		$location = e.currentTarget.value.replace(/\b, United States\b/g, '');
    $("input#"+tagPool.id).val($location);

  	$('.existing-'+tagPool.id+'-locations').tagit('createTag', $location);

  	if (tagPool.id === "proximity_cities"){
  		proximityCityRequest($location, tagPool.id, false);
  	}
    $("input#"+tagPool.id).val("");
	});

	$('.typeahead').on('blur', function(){
		$("input#"+tagPool.id).val("");
	});
}
/////////////////////////////////////
/////////////////////////////////////
editLoadSelectionPool = function(tagPool, collection){
	$(".existing--locations").tagit({
    	onTagRemoved: function(event, ui){
    		destroyLocationObject(ui[0].innerText);
    	}
    });
  	$.each(collection, function(k, v){
  		$(".existing--locations").tagit("createTag", v);
  	});
  $("input.ui-widget-content").attr('disabled', 'disabled');
}

editLocationSelector = function(tagPool){
	console.log(tagPool.id);
	var locations = new AddressPicker({
		autocompleteService: {
			// types: ["(cities)"],
			types: ["geocode"],
			componentRestrictions: { country: 'US' }
		}
	});
	locations.initialize();
	$('.typeahead#'+tagPool.id).typeahead(null, {
		limit: 1,
		displayKey: 'description',
	  source: locations.ttAdapter()
	}).bind("typeahead:selected", function(e, i, o){ 
		$location = e.currentTarget.value.replace(/\b, United States\b/g, '');
    $("input#"+tagPool.id).val($location);

  	$('.existing--locations').tagit('createTag', $location);
  	createLocationObject($location);
  	if (tagPool.id === "proximity_cities"){
  		proximityCityRequest($location, '', true);
  	}
    $("input#"+tagPool.id).val("");
	});

	$('.typeahead').on('blur', function(){
		$("input#"+tagPool.id).val("");
	});
}