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



CURRENTLY IN PROGRESS:
-once thats complete, check on Slack workspace for some ideas, or:
    >consider making a post route to change the info later on, but dunno how this would be useful( just a put?? )
    >make a page showing the posting (or to potentially show), and then all the listings per user.
    > from that page allow the user to then edit the posting.
    >route for now is under products, reference the anchor on the listings page

-make it so the errors are added in to the register route (messages already setup, just make a small error div like on the creation page)
-ADD AN ERROR PAGE FFS THAT ISNT JUST SENDING