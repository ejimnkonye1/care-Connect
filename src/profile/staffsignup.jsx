export const StaffSign = () => {
    return(
        <form id="staff-signup-form">
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="staff-name">Staff Name:</label>
              <input type="text" id="staff-name" name="staff-name" className="form-control" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" className="form-control" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" className="form-control" />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
      </form>
    )
}