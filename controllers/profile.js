const profileController={
    getProfile:(req,res,next)=>{
        res.render('shop/profile',{
            path:'/profile',
            pageTitle:'profile'

        })
    }
}
module.exports=profileController