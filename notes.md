bugs -> render correct name in movielist



[
{
id: 326,
name: "Toy Story"
},
{
id: 327,
name: "Toy Story 2"
},
{
id: 328,
name: "Toy Story 3"
},
{
id: 329,
name: "Toy Story 4"
}
]

edit Toy Story id 326 to Kung Fu Panda

[
{
id: 327,
name: "Toy Story 2"
},
{
id: 328,
name: "Toy Story 3"
},
{
id: 329,
name: "Toy Story 4"
},
{
id: 326,
name: "Kung Fu Panda"
}
]

movie posters display correctly 327, 328, 329, 326
but movielist displays

Kung Fu Panda 326
Toy Story 3 328
Toy Story 4 329
Kung Fu Panda 326

maybe because kung fu panda did not receive the updated toy story 2

input field value not updating properly