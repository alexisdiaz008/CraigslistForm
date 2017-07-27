class Job < ApplicationRecord
  belongs_to :user
  has_many :locations, dependent: :destroy
  has_many :time_slots, dependent: :destroy
  # validates :locations, presence: true
  # validates :time_slots, presence: true

  def sorted_dates
    self.time_slots.sort_by(&:scheduled)
  end

  def self.to_csv(collection)
    CSV.generate() do |csv|
      csv << ["Title", "Field", "Locations", "Locations Price", "Times"]
      collection.each do |job|
        locs=job.locations
        times=job.sorted_dates
        max, min= job.locations.count > job.time_slots.count ? [locs,times] : [times, locs]
        combined_array=max.zip(min)
        if combined_array[0][0].class == TimeSlot
          combined_array=combined_array.map {|array|[(array[0].blank? ? nil : array[0].scheduled), (array[1].blank? ? nil : array[1].name), (array[1].blank? ? nil : array[1].value)]}
          combined_array.each_with_index do |val_pair, index|
            if index.eql?(0)
              csv << [job.title, job.category, val_pair[1],val_pair[2], val_pair[0]]
              else
              csv << [nil, nil, val_pair[1], val_pair[2], val_pair[0]]
            end
          end
        else
          combined_array=combined_array.map {|array|[(array[0].blank? ? nil : array[0].name), (array[0].blank? ? nil : array[0].value), (array[1].blank? ? nil : array[1].scheduled)]}
          combined_array.each_with_index do |val_pair, index|
            if index.eql?(0)
              csv << [job.title, job.category, val_pair[0], val_pair[1], val_pair[2]]
              else
              csv << [nil, nil, val_pair[0], val_pair[1], val_pair[2]]
            end
          end
        end
      end
    end
  end

  def self.date_present?(date, job)
    TimeSlot.where(scheduled: date, job_id: job.id).present?
  end

  def js_array
    locations.map(&:name).to_json
  end

  def create_locations(locations_array)
    locations_array.each { |loc| Location.create(name: loc, job_id: self.id)}
    Location.update_values
  end

  def create_time_slots(time_slots_array)
    time_slots_array.each { |time_slot| TimeSlot.create(scheduled: time_slot, job_id: self.id)}
  end
end
