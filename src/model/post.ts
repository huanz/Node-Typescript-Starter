import * as mongoose from 'mongoose';

export type PostModel = mongoose.Document & {
    title: string;
    content: string;
    author: string;
    createdAt?: Date;
    updateAt?: Date;
    getTitle: () => string;
    getById: (id: string) => PostModel;
    list: () => Promise<PostModel[]>;
};

export const PostSchema: mongoose.Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

PostSchema.pre('update', function update(next) {
    this.update(
        {},
        {
            $set: {
                updatedAt: Date.now
            }
        }
    );
    next();
});

PostSchema.methods.getTitle = function(): string {
    return this.title.trim();
};

PostSchema.statics.getById = function(id: string): Promise<PostModel> {
    return this.findById(id)
        .lean()
        .exec();
};

PostSchema.statics.getInstanceById = function(id: string): Promise<PostModel> {
    return this.findById(id).exec();
};

PostSchema.statics.list = function(): Promise<PostModel[]> {
    return this.find()
        .lean()
        .exec();
};

export const Post = mongoose.model('Post', PostSchema);
export default Post;
