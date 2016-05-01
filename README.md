# Working example of Blender REST export

With the changes in https://github.com/daniel-nth/three.js/tree/blender-rest-export  

marine_anims_core_rest.blend is a slightly modified version of marine_anims_core.blend from the three.js repo.  

## Changes:  

* Delete the NLA track on the male_marine mesh
[[https://github.com/daniel-nth/three.js-rest-example/blob/master/doc/delete-me.jpg|alt=NlaTrack]]
* Set the "Deform" property on the "Fbx01" bone 
[[https://github.com/daniel-nth/three.js-rest-example/blob/master/doc/tick-me.jpg|alt=Deform]]
* Set the skeleton to Rest position
* Set the Alpha value under Transparency in the Material tab of male_marine to 1. Otherwise the opacity in the export 
would be 0 and the marine invisible, even with Transparency unticked.

## Export
Make sure the skeleton is in Rest position. Use these settings:  
[[https://github.com/daniel-nth/three.js-rest-example/blob/master/doc/settings.jpg|alt=NlaTrack]]

