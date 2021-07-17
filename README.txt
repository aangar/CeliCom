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



CURRENTLY IN PROGRESS:
-once thats complete, check on Slack workspace for some ideas, or:
    >work on users making listings
        +verification
        +logged IN
        +time and date
        +all the goodies
-make the form and routes to handle the creation of a listing being made
    >use locals.currentUser to find the user, make a copy, then resave that as a new bit.
    >consider making a post route to change the info later on, but dunno how this would be usefuL( just a put?? )
-ADD AN ERROR PAGE FFS THAT ISNT JUST SENDING