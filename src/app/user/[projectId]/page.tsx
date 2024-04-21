interface UserProjectPageProps {
  params: {
    projectId: string;
  };
}

const UserProjectPage = ({ params }: UserProjectPageProps) => {
  const projectId = params.projectId;
  return (
    <>
      <div>{projectId}</div>
    </>
  );
};

export default UserProjectPage;
