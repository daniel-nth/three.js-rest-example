# Working example of Blender REST export

With the changes in https://github.com/daniel-nth/three.js/tree/blender-rest-export  
Live example: http://daniel-nth.github.io/three.js-rest-example/examples/webgl_animation_skinning_blending_rest.html

marine_anims_core_rest.blend is a slightly modified version of marine_anims_core.blend from the three.js repo.  

## Changes in the blend file:  

* Delete the NLA track on the male_marine mesh  
![delete nla track](https://raw.githubusercontent.com/daniel-nth/three.js-rest-example/master/doc/delete-me.jpg)
* Set the "Deform" property on the "Fbx01" bone  
![set deform](https://raw.githubusercontent.com/daniel-nth/three.js-rest-example/master/doc/tick-me.jpg)
* Set the skeleton to Rest position
* Set the Alpha value under Transparency in the Material tab of male_marine to 1. Otherwise the opacity in the export 
would be 0 and the marine invisible, even with Transparency unticked.

## Export
Make sure the skeleton is in Rest position. Use these settings:  
![Settings](https://raw.githubusercontent.com/daniel-nth/three.js-rest-example/master/doc/settings.jpg)

