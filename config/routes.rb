Rails.application.routes.draw do
	

  devise_for :users
	  root 'jobs#index'

	resources :user do
		resources :jobs
		resources :job do
			resources :time_slot
			resources :location
		end	  
	end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
