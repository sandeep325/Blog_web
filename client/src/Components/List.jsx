import React,{useState,useEffect} from "react";
import { ApiCall } from "./ApiCall/ApiCall";
import { Link,useHistory } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { confirm } from "react-confirm-box";
const List = () =>{
const [blogs,setBlogs] = useState([]);
const [name,setName] = useState([]); 
const [email,setEmail] = useState([]);
const [description,setDescription] = useState([]);
const [ID,setId] = useState([]);
const [Msg, setMsg] = useState({ color: "", txt: "" });
    const GetBlogs = async () => {
        try {
            const response = await ApiCall('/blogs', 'get');
            if (response?.status == 200) {
                setBlogs(response?.data);
            }
        } catch (err) {
            console.log("Error while loading blogs.");
            // console.log(err);
        }
    }
    useEffect(() => {
        GetBlogs();
    }, []);

    async function deleteBlog(id) {
        var confirmBox = await confirm("Do you really want to delete this Blog ?")
        if (confirmBox) {
            async function delBlog() {
                try {
                const response = await ApiCall(`/blogs/${id}`, 'delete');
                    if (response.status === 200) {
                        GetBlogs();
                            // toast.error('blog deleted Successfully.', { position: toast.POSITION.TOP_CENTER }, { autoClose: 9000 })
                    }

                } catch(error) {
                        // toast.error("Could not deleted.", { position: toast.POSITION.TOP_CENTER }, { autoClose: 9000 })

                }
            }  //function close
            delBlog();
        } else {
            return false;
        }

    }

const HandleChange =(e)=>{
    if (e.target.name === "name") {
        setName(e.target.value);
    }
    else if (e.target.name === "email") {
        setEmail(e.target.value);

    } else if (e.target.name === "description") {
        setDescription(e.target.value);
    }
}
    const AddBlog = async(e) =>{
        e.preventDefault();
        if (name == '' || email == '' || description == "") {
            setMsg({ color: "red", txt: "All Fileds are required." });
        } else if(name?.length <4){
            setMsg({ color: "red", txt: "Name is too short." });
        }
         else {
            setMsg({ color: '', txt: '' });
            let obj = {
                name,email,description
            };
            const response = await ApiCall('/blogs', 'post', obj);
            if(response?.status ==201) {
                setMsg({ color: 'green', txt: response?.message  });
                setTimeout(() => {
                    setMsg({ color: '', txt: ''});
                    document.getElementById("addEmployeeModal").click();
                }, 2000);
                GetBlogs();
            }
        }
    }
const addModal = () =>{
    console.log("test add");
    setName("");
 setEmail("");
  setDescription("");
}
    // edit modal fetch data
    const editmodal = (id) =>{
let singleBlog = blogs.filter((val)=>{ return val?._id==id });
setName(singleBlog[0]?.name);
 setEmail(singleBlog[0]?.email);
  setDescription(singleBlog[0]?.description);
  setId(singleBlog[0]?._id);
    }


const updateBlog =  async(e) =>{
    e.preventDefault();
    if (name == '' || email == '' || description == "") {
        setMsg({ color: "red", txt: "All Fileds are required." });
    } else if(name?.length <4){
        setMsg({ color: "red", txt: "Name is too short." });
    }
     else {
        setMsg({ color: '', txt: '' });
        let obj = {
            name,email,description
        };
        const response = await ApiCall(`/blogs/${ID}`, 'patch', obj);
        if(response?.status ==200) {
            setMsg({ color: 'green', txt: response?.message  });
            setTimeout(() => {
                setMsg({ color: '', txt: ''});
                document.getElementById("editEmployeeModal").click();
            }, 2000);
            GetBlogs();
        }
    }
}
return(
    <>
<div class="container-xl">
<ToastContainer style={{ marginTop: "10%", zIndex: 999 }} />
	<div class="table-responsive">
		<div class="table-wrapper">
			<div class="table-title">
				<div class="row">
					<div class="col-sm-6">
						<h2>Blog <b>Dashboard</b></h2>
					</div>
					<div class="col-sm-6">
						<a href="#addEmployeeModal" class="btn btn-success" data-toggle="modal" onClick={()=>{addModal()}} ><i class="material-icons" >&#xE147;</i> <span>Add New Blog</span></a>
					</div>
				</div>
			</div>
			<table class="table table-striped table-hover">
				<thead>
					<tr>
						<th>S.No.</th>
						<th>Blog By</th>
						<th>Email</th>
						<th>Blogs</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
                
                { blogs?.map((val, index) => (
                    <>
                    	<tr>
						<td>{index+1}</td>
						<td>{val?.name}</td>
						<td>{val?.email}</td>
						<td> {val?.description}</td>
						<td>
							<a href="#editEmployeeModal" class="edit" data-toggle="modal" onClick={()=>{editmodal(val._id)}}><i class="material-icons" data-toggle="tooltip" title="Edit" >&#xE254;</i></a>
							<a  class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete"  onClick={(e) => deleteBlog(val._id)}  >&#xE872;</i></a>
						</td>
					</tr>	
                    </>
                ))}
								
				</tbody>
			</table>
		</div>
	</div>        
</div>




{/* add modal */}
<div id="addEmployeeModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form>
				<div class="modal-header">						
					<h4 class="modal-title">Add Blog</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
					<div class="form-group">
						<label>Name</label>
						<input type="text" name="name" class="form-control" onChange={HandleChange} required/>
					</div>
					<div class="form-group">
						<label>Email</label>
						<input type="email"  name="email"class="form-control" onChange={HandleChange} required/>
					</div>
					<div class="form-group">
						<label>Description</label>
						<textarea class="form-control" name="description" onChange={HandleChange} required></textarea>
					</div>
				</div>
				<div class="modal-footer">
                <span style={{ color: Msg.color }}>{Msg.txt}</span>
					<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel"/>
					<input type="button" class="btn btn-success" value="Add"  onClick={AddBlog}/>
				</div>
			</form>
		</div>
	</div>
</div>

{/* edit modal */}
<div id="editEmployeeModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form>
				<div class="modal-header">						
					<h4 class="modal-title">Edit Blog</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
					<div class="form-group">
						<label>Name</label>
						<input type="text" name="name" class="form-control" value={name} onChange={HandleChange} required/>
					</div>
					<div class="form-group">
						<label>Email</label>
						<input type="email"  name="email"class="form-control" value={email} onChange={HandleChange} required/>
					</div>
					<div class="form-group">
						<label>Description</label>
						<textarea class="form-control" name="description" value={description} onChange={HandleChange} required></textarea>
					</div>
				</div>
				<div class="modal-footer">
                <span style={{ color: Msg.color }}>{Msg.txt}</span>
					<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
					<input type="submit" class="btn btn-info" value="Update" onClick={updateBlog}/>
				</div>
			</form>
		</div>
	</div>
</div>
    </>
);
}
export default List;