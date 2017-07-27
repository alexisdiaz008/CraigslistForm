module ApplicationHelper

	def selector_description_for(selector)
		case selector
		when :proximity_cities
			"Select a city to add nearby cities to the location pool."
		when :cities
			"Select a specific city to add to the location pool."
		end
	end


	def job_template_category_options
		[
			["accounting/finance", "accounting/finance"], 
			["admin/office", "admin/office"], 
			["architect/engineer/cad (no IT/computer jobs here please)", "architect/engineer/cad"], 
			["art/media/design", "art/media/design"], 
			["business/mgmt", "business/mgmt"], 
			["customer service", "customer service"],
			["education/teaching", "education/teaching"],
			["et cetera", "et cetera"],
			["food/beverage/hospitality", "food/beverage/hospitality"],
			["general labor", "general labor"],
			["government", "government"],
			["healthcare", "healthcare"],
			["human resource", "human resource"],
			["internet engineering", "internet engineering"],
			["legal/paralegal", "legal/paralegal"],
			["manufacturing", "manufacturing"],
			["marketing/advertising/pr", "marketing/advertising/pr"],
			["nonprofit", "nonprofit"],
			["real estate", "real estate"],
			["retail/wholesale", "retail/wholesale"],
			["sales", "sales"],
			["salon/spa/fitness", "salon/spa/fitness"],
			["science/biotech", "science/biotech"],
			["security", "security"],
			["skilled trades/artisan", "skilled trades/artisan"],
			["software/qa/dba/etc", "software/qa/dba/etc"],
			["systems/networking", "systems/networking"],
			["technical support", "technical support"],
			["transportation", "transportation"],
			["tv/film/video/radio", "tv/film/video/radio"],
			["web/html/info design", "web/html/info design"],
			["writing/editing", "writing/editing"]
		]
	end
end
