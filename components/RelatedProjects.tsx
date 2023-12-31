import { ProjectInterface, UserProfile } from "@/common.types";
import { getUserProjects } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";

type Props = {
    userId: string;
    projectId: string;
}

const RelatedProjects = async ({ userId, projectId }: Props) => {
    
    const result = await getUserProjects(userId) as { user?: UserProfile }

    const filteredProjects = result?.user?.projects?.edges?.filter(
        ({ node }: { node: ProjectInterface }) => node?.id !== projectId
    )

    if(filteredProjects?.length === 0) return null;

    return (
        <section className="flex flex-col mt-32 w-full pl-20 pr-20">
            <div className="flexBetween">
                <p className="text-base font-bold">More by {result?.user?.name}</p>
                <Link 
                    href={`/profile/${result?.user?.id}`}
                    className="text-orange-500 text-base underline underline-offset-4"
                >View All</Link>
            </div>

            <div className="related_projects-grid">
                {
                    filteredProjects?.map(({ node }: { node: ProjectInterface }) => (
                        <div className="flexCenter related_project-card drop-shadow-card">
                            <Link 
                                href={`/project/${node?.id}`}
                                className="flexCenter group relative w-full h-full" 
                            >
                                <Image
                                    src={node?.image}
                                    width={200}
                                    height={200}
                                    alt="project image"
                                    className="w-full h-full" 
                                />
                                <div className="hidden group-hover:flex related_project-card_title">
                                    <p className="w-full font-mukta">{node?.title}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default RelatedProjects