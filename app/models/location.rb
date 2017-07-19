class Location < ApplicationRecord
  belongs_to :job

	def self.update_values
		CSV.foreach("#{Rails.root}/lib/craiglist_values.csv") do |row|
			locations = self.where(name: "#{row[1]}, #{row[0]}")
			locations.each do |loc|
				loc.update_attribute(:value, row[2])
			end
		end
	end

end
