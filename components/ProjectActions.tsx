"use client";

import { deleteProject, fetchToken } from "@/lib/actions";
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProjectActions = ({ projectId }: { projectId: string }) => {
    
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDeleteProject = async () => {
        setIsDeleting(true);

        const { token } = await fetchToken();

        try {
            await deleteProject(projectId, token);
            router.push('/');
        } catch (error) {
            console.log(error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <Link 
                href={`/edit-project/${projectId}`}
                className="flexCenter edit-action_btn"
            >
                <Image
                    src="/pencil.svg"
                    width={20}
                    height={20}
                    alt="edit" 
                />
            </Link>

            <button 
                type="button" 
                className={`flexCenter delete-action_btn ${isDeleting ? 'bg-gray' : 'bg-orange-500'}`}
                onClick={handleDeleteProject}
            >
                <Image
                    src="/trash.svg"
                    width={20}
                    height={20}
                    alt="delete" 
                />
            </button>
        </>
    )
}

export default ProjectActions