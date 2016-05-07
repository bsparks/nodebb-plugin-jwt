<h1><i class="fa fa-file-archive-o"></i> JWT Setup</h1>
<hr />

<form class="jwt">
    <div class="form-group">
        <p>
            Enter your application shared secret details here.
        </p>
        <br />
        <input type="text" name="secret" title="Shared Secret" class="form-control" placeholder="Shared Secret">
        <p class="help-block">
            This will be used to sign the JWT.
        </p>
    </div>
</form>
<button class="btn btn-lg btn-primary" type="button" id="save">Save</button>
