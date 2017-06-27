class TimeSlot < ApplicationRecord
  belongs_to :job

  def humanize_time_slot
    scheduled.strftime("%B %d, %Y")
  end

end
