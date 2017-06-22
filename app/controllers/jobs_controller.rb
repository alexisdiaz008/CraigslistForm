class JobsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_job, only: [:show, :update, :destroy]

  def index
    @job = current_user.jobs.new
    @jobs = current_user.jobs
  end

  def new
    @job = current_user.jobs.new
  end

  def create
    @job = current_user.jobs.new(job_params)
    if @job.save
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
