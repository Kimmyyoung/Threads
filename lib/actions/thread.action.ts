'use server'
import { revalidatePath } from '@/node_modules/next/cache';
import Thread from '../models/thread.model';
import User from '../models/user.model';
import { connectToDB } from './../mongoose';



interface Params {
  text: string,
  author: string,
  communityId: string | null,
  path: string
}

export async function createThread({text, author, communityId, path}: Params) {

  try{
    connectToDB();
  
    const createThread = await Thread.create({
      text,
      author,
      community: null,
    });
  
    //update usermodel
  
    await User.findByIdAndUpdate(author, {
      $push: { threads : createThread._id }
    })
  
    revalidatePath(path);
  }catch(error : any){
    throw new Error(error.message);
  }
}


export async function fetchPostThreads(pageNumber=1, pageSize=20) {
  connectToDB();

  //Calculate the number of posts to skip
  const skipAmount = (pageNumber - 1) * pageSize;

  //Fetch the post with no parents(top-level data)
  const postQuery = Thread.find({parentId : { $in : [null, undefined]}})
  .sort({createdAt: 'desc'})
  .skip(skipAmount)
  .limit(pageSize)
  .populate({ path: 'author', model: User })
  .populate({
    path: 'children',
    populate: {
      path: 'author',
      model: User,
      select: '_id name parentId image'
    }
  })

  const totalPostCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } });

  const posts = await postQuery.exec();
  const isNext = totalPostCount > skipAmount + posts.length;

  return { posts, isNext };
  

}

export async function fetchThreadById(id: string) { 
  connectToDB();

  try{
    const thread = await Thread.findById(id)
    .populate({
      path: "author",
      model: User,
      select: "_id id name image",
    }) // Populate the author field with _id and username
    .populate({
      path: "children", // Populate the children field
      populate: [
        {
          path: "author", // Populate the author field within children
          model: User,
          select: "_id id name parentId image", // Select only _id and username fields of the author
        },
        {
          path: "children", // Populate the children field within children
          model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
          populate: {
            path: "author", // Populate the author field within nested children
            model: User,
            select: "_id id name parentId image", // Select only _id and username fields of the author
          },
        },
      ],
    })
    .exec();

  return thread;
  } catch(error:any) {
    throw new Error(error.message);
  }
}