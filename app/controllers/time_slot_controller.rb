class TimeSlotController < ApplicationController
before_action :set_time_slot, only: [:show, :update, :destroy]

  def index
  end

  def new
  end

  def create
  end

  def show
  end

  def edit
  end

  def update
     @time_slot.update(time_slot_params)
  end

  def destroy
  end

  private

  def set_time_slot
    @time_slot = TimeSlot.find(params[:id])
  end

  def time_slot_params
    params.require(:time_slot).permit(:scheduled)
  end
end
