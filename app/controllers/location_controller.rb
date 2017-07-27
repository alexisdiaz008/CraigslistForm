class LocationController < ApplicationController
before_action :set_location, only: [:show, :update, :destroy]

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
     @location.update(location_params)
  end

  def destroy
  end

  private

  def set_location
    @location = Location.find(params[:id])
  end

  def location_params
    params.require(:location).permit(:name, :value)
  end
end
