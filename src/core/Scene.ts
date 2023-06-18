import { Entity } from "./entity";

export class Scene
{

	private entities: Entity[];

	constructor()
	{
		this.entities = [];
	}

	//Insertion sort, as the entities list should be nearly sorted at all times (except maybe load)
	private sortEntities() : void
	{
		let j = 0;
		for(let i = 1; i < this.entities.length; i++)
		{
			j = i - 1;
			const current = this.entities[i].z_index;
			while( (j >= 0) && (current < this.entities[j].z_index))
			{
				this.entities[j+1] = this.entities[j];
				j--;
			}
			this.entities[j+1]= this.entities[current];

		} 
	}
	/**
	 * This is more efficient when adding very few entities - i.e. 1 or 2 at a time
	 * @param entity 
	 */
	public addSingleEntity(entity: Entity) : void
	{
		//To efficiently put this in we use binary search to find the greatest element less than our entities z-indexx
		let left = 0;
		let right = this.entities.length-1;
		let index = 0;
		let mid = 0;
		while( left <= right)
		{
			mid = Math.floor( (left+right)/2);
			if(this.entities[mid].z_index < entity.z_index)
			{
				left = mid+1;
				index = left;
			}
			else
			{
				right = mid - 1;
			}
		}
		this.entities.splice(index,0,entity);
	}
	//Either adds via binary search + insertion, or push + sort depending on size of entiteies
	public addEntities(entities: Entity[]) : void
	{
		//If the given entities are more than 25% of the current entities, we sort.
		//Otherwise we add them oen at a time
		if(this.entities.length * 0.25 > entities.length)
		{
			this.entities.push(...entities);
			this.entities.sort( (a,b) => a.z_index-b.z_index);
			return;
		}
		this.entities.forEach( (entity: Entity) => this.addSingleEntity(entity)); 
	}
	public removeEntity(entity: Entity) : boolean
	{
		//TODO: Right efficient binary search on z-index to find entity
		const index = this.entities.indexOf(entity);

		if(index === -1)
		{
			return false;
		}
		this.entities.splice(index,1);
		return true;
	}
	public update(dt: number) : void
	{
		this.entities.forEach(entity => entity.update(dt));
	}
	public draw(dt: number) : void
	{
		this.entities.forEach((entity) => entity.draw(dt));
	}
}