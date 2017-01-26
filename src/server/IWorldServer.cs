using System.ServiceModel;
using System.ServiceModel.Web;
using System.ServiceModel.Description;

[ServiceContract]
public interface IWorldServer
{
	[OperationContract]
	[WebGet (ResponseFormat = WebMessageFormat.Json)]
	byte GetSurface (uint x, uint y);

	[OperationContract]
	[WebGet (ResponseFormat = WebMessageFormat.Json)]
	SurfaceRect GetSurfaceRect (uint left, uint top, uint right, uint bottom);

	[OperationContract]
	[WebInvoke (Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
	bool SetSurface (uint x, uint y, byte surface);

	[OperationContract]
	[WebInvoke (Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
	bool SetSurfaceRect (uint left, uint top, uint right, uint bottom, byte surface);

	[OperationContract]
	[WebInvoke (Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
	bool SetSurfaceCircle (uint x, uint y, uint radius, byte surface);

}
