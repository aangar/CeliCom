this is the readme.
every time i make an update ill post it here. hopefully it doesnt break anything.
the last fully stable build is on 7/15, and that was with user functionality and all the goodies, plus the cart.

ADDED :
7/16
-made the removal possible
    >make verification for if the item isnt in the cart, even for a request made.
-made the redirect to the cart, it just looks better overall
-checked for if an item was there, it wouldnt let you add it.
    >reasoning for this is that if this is point-to-point reselling, you wouldnt want it to add it again.
-just some general better looks and redirects, nothing to special for now.
7/17
-made the form for the creation of a listing / product.
-made the post route for the listing creation, havent made the actual database save yet.
-made a validation middleware.
-added an error handle for the post route.
-added the post route logic in the entirety, so it just adds the id to the posters profile.
-can find things by the ID Search!!!
7/18
-fixed a small bug for the redirect on the post route when making a listing.
-made the user listings page possible! still needs work on the routes and edit, mentioned below
-made the update route work!!! 
-made the removal route work, and added logic to remove it from the listers' listings.
7/19
-next major update completed!!!
-foundation has been made in terms of listings!
-added:
    >errors for login
    >restyled the error page
    >touched up some routes
-added security stuff!!!


CURRENTLY IN PROGRESS:
-add some fine tune stuff:
    >limit results (make it so it accepts a parameter and redirect sorta thing??? use req.params and have that be a numeric value to search the db by.)
    >tune the searches (they might be quite primitive, moreso the word search)
-security and deployment


note for pro deploy : 
-on deleting a listing, make sure to search for other users having it in their cart, then update that cart based on if it got removed. this could be a rendering problem in the future.