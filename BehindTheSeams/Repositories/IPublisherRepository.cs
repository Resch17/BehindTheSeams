using BehindTheSeams.Models;
using System.Collections.Generic;

namespace BehindTheSeams.Repositories
{
    public interface IPublisherRepository
    {
        List<Publisher> GetAll();
        Publisher GetById(int id);
    }
}