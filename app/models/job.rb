class Job < ApplicationRecord
  belongs_to :user
  has_many :locations, dependent: :destroy
  has_many :time_slots, dependent: :destroy

  def self.date_present?(date, job)
    TimeSlot.where(scheduled: date, job_id: job.id).present?
  end
end
