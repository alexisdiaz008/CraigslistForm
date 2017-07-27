class AddApplyUrlToJob < ActiveRecord::Migration[5.0]
  def change
    add_column :jobs, :apply_url, :string
  end
end
