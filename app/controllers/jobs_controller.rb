class JobsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_job, only: [:show, :update, :destroy]
  respond_to :html, :xls, :csv

  def index
    @job = Job.new
    @jobs = current_user.jobs
    @calendar_range=(Time.now.to_date.beginning_of_month .. Time.now.end_of_year-1.day)
    @month_range=@calendar_range.map {|date| date.beginning_of_month ? date.strftime("%B") : ""}.uniq!
    respond_to do |format|
      format.html
      format.csv { send_data Job.to_csv(@jobs) }
    end
  end

  def new
    @job = current_user.jobs.new
  end

  def create
    @job = current_user.jobs.new(job_params)
    if @job.save
      @job.create_locations(params[:marketGroup]) if params[:marketGroup]
      @job.create_time_slots(params[:timeSlots]) if params[:timeSlots]
      redirect_to root_path
    else
      render :new
    end
  end

  def show
  end

  def edit
  end

  def update
    @job.update(job_params)
  end

  def destroy
    @job.destroy
    redirect_to root_path
  end

  private

  def set_job
    @job = Job.find(params[:id])
  end

  def job_params
    params.require(:job).permit(:title, :category)
  end
end
