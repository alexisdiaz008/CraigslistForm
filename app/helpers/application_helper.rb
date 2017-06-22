module ApplicationHelper

	def selector_description_for(selector)
		case selector
		when :proximity_cities
			"Select a city to add nearby cities to the location pool."
		when :cities
			"Select a specific city to add to the location pool."
		end
	end
end
