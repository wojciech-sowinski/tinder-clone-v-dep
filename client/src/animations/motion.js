export const pageContainerVariants = {
    hidden: { 
        position:'absolute',
        x:"100%",
},
    visible: {
        position:'absolute',
        x:"0",
        transition: {
            
            duration: .3
          },
    }, exit: {
        position:'absolute',
        x:"-100%",
        transition: {
            
            duration: .3,
            
          }
        
    },
   
}

export const divScaleIn = {hidden: { 
    width:0,
    scale:0
},
visible: {
   width:'auto',
    scale:1,
    transition: {
        
        duration: 1
      },
}, exit: {
    width:0,
    scale:0,
    transition: {
        
        duration: .2,
        
      }
    
},}
export const divScaleInNoResize = {
    hidden: { 
   
    scale:0
},
visible: {
   
    scale:1,
    transition: {
       
        duration: 1
      },
}, exit: {
   
    scale:0,
    transition: {
        
        duration: .2,
        
      }
    
},}

export const divContainerVariants = {
    hidden: { 
        opacity:0,
        scale:.5
},
    visible: {
        opacity:1,
        scale:1,
        transition: {
            
            duration: .3
          },
    }, exit: {
        opacity:0,
        scale:.5,
        transition: {
            
            duration: .3,
            
          }
        
    },
}
export const divFlipContainerVariants = {
    hidden: { 
        opacity:0,
        transform: 'rotateX(90deg)'
},
    visible: {
       opacity:1,
        transform: 'rotateX(0deg)',
        transition: {
            
            duration: 0.4
          },
    }, exit: {
        opacity:0,
        transform: 'rotateX(90deg)',
        transition: {
            
            duration: 0.4,
            
          }
        
    },
}

export const divFlipHorizontalWithResize = {
    hidden: { 
        height:0,
        transform: 'rotateX(90deg)'
},
    visible: {
       height:100,
        transform: 'rotateX(0deg)',
        transition: {
            
            duration: 0.4,
            delay:1
          },
    }, exit: {
        height:0,
        transform: 'rotateX(90deg)',
        transition: {
            
            duration: 0.4,
            
          }
        
    },
}

export const divContainerFade = {
    hidden: { 
        opacity:0,
       
},
    visible: {
       opacity:1,
      
        transition: {
            
            duration: 0.4
          },
    }, exit: {
        opacity:0,
       
        transition: {
            
            duration: 0.4,
            delay:.5
            
          }
        
    },
}



