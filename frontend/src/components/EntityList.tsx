import React, { useState, useEffect } from "react";
import { axiosInstance } from "../api";
import ModelTable from "./ModelTable";
import { useAuth } from "./AuthContext";

const EntityList: React.FC<{
  endpoint: string;
  headers: string[];
  entityType: string;
}> = ({ endpoint, headers, entityType }) => {
  const [entities, setEntities] = useState<Array<any>>([]);
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      axiosInstance
        .get(endpoint)
        .then((response) => {
          setEntities(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(
            `Error fetching the ${entityType.toLowerCase()}s:`,
            error
          );
        });
    }
  }, [endpoint, entityType, isAuthenticated]);

  const handleDelete = async (id: string) => {
    const detailEndpoint = `${endpoint}/${id}`;
    await axiosInstance
      .delete(detailEndpoint)
      .then(() => {
        setEntities(entities.filter((entity) => entity.id !== id));
      })
      .catch((error) => {
        console.error(`Error deleting the ${entityType.toLowerCase()}:`, error);
      });
  };

  return (
    <div className="space-y-6 w-full">
      {isLoading && (
        <>
          <div className="h-10 w-full bg-gray-800"></div>
          <div className="flex w-full items-center justify-center">
            <h2 className="font-bold">Loading...</h2>
          </div>
        </>
      )}
      {entities.length === 0 && !isLoading && (
        <>
          <div className="h-10 w-full bg-gray-800"></div>
          <div className="flex w-full items-center justify-center">
            <h2 className="font-bold capitalize">No {entityType}s found</h2>
          </div>
        </>
      )}
      {entities.length > 0 && (
        <>
          <ModelTable
            modelList={entities}
            headers={headers}
            handleDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default EntityList;
