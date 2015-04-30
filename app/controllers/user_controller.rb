class UserController < ApplicationController

   def new
     @user = User.new
   end

    SUCCESS = 1
    FAILURE = -1

    # Create a user
    def createUser
         user = 0
         # Depending on usertype, create an Advertiser (0) or Owner (1)
         params = create_params
         type = params[:usertype]
         if type.eql? "0" or type.equal? 0
            user = Artist.createUser(params)
         elsif type.eql? "1" or type.equal? 1
            user = Business.createUser(params)
         #user exists and wants to add user type
         else
            #Should never reach here
            puts "SHOULDNT BE HERE"
            render :json => { status: -5 } and return
         end

         # If it's a string, then it was a success
         # Else, then it was a failure

         if not user.is_a? Integer
            cookies[ :username ] = user.username
            cookies[ :usertype ] = user.usertype
            #set a permanent cookie to save state of dashboard
            # save dashboard state -- users now have the ability to toggle between dashboard states
            cookies.permanent[:dashboard_state] = user.usertype
            render :json => { status: SUCCESS }
         else
            render :json => { status: user }
         end
    end

    # Login user
    def loginUser
        #If they're an advertiser, then render and return
        artist = Artist.validateUser login_params
        if not artist.is_a? Integer
           cookies[ :username ] = artist.username
           cookies[:usertype] = artist.usertype
           render :json => { status: SUCCESS } and return
        end

        #If they aren't an advertiser, they might be an owner
        business = Business.validateUser login_params
        if not business.is_a? Integer
           cookies[ :username ] = business.username
           cookies[:usertype] = business.usertype
           render :json => { status: SUCCESS }
        else
           render :json => { status: FAILURE }
        end
    end

    # Signout just deletes the cookie
    def signoutUser
        cookies.delete :username
        cookies.delete :usertype
        redirect_to root_path
    end

    private
    # The necessary parameters for creating an owner/advertiser
    def create_params
        params.require(:user).permit(:username, :password, :email, :company, :usertype)
    end

    # The necessary parameter for logging in an owner/advertiser
    def login_params
        params.require(:user).permit(:username, :password)
    end
end
