class CreateTimeSlots < ActiveRecord::Migration[5.0]
  def change
    create_table :time_slots do |t|
      t.references :job, foreign_key: true
      t.date :scheduled

      t.timestamps
    end
  end
end
