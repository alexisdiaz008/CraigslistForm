class AddValuesToLocations < ActiveRecord::Migration[5.0]
  def change
    add_column :locations, :value, :string
  end
end
