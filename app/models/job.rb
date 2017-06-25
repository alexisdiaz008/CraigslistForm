class Job < ApplicationRecord
  belongs_to :user
  has_many :locations, dependent: :destroy
  has_many :time_slots, dependent: :destroy

  def self.date_present?(date, job)
    TimeSlot.where(scheduled: date, job_id: job.id).present?
  end

  def js_array
    locations.map(&:name).to_json
  end

  def create_locations(locations_array)
    locations_array.each { |loc| Location.create(name: loc, job_id: self.id)}
  end

  def create_time_slots(time_slots_array)
    time_slots_array.each { |time_slot| TimeSlot.create(scheduled: time_slot, job_id: self.id)}
  end
end
